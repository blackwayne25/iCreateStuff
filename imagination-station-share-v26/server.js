"use strict";
const http=require("node:http"), fs=require("node:fs"), path=require("node:path"), crypto=require("node:crypto");
const TOKEN=process.env.IMAGINATION_INVITE_KEY||"", SECRET=process.env.IMAGINATION_COOKIE_SIGNING_KEY||"";
if(TOKEN.length<40||SECRET.length<48){console.error("Missing share secret; refusing to start");process.exit(1);}
const PORT=Number(process.env.PORT||10000), guest=fs.readFileSync(path.join(__dirname,"guest.html"),"utf8");
const COOKIE="is_guest_v26", VALUE=crypto.createHmac("sha256",SECRET).update("session:"+TOKEN).digest("base64url");
const HEAD={"cache-control":"private,no-store,max-age=0","x-content-type-options":"nosniff","x-frame-options":"DENY","strict-transport-security":"max-age=31536000","referrer-policy":"no-referrer","x-robots-tag":"noindex,nofollow","content-security-policy":"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' blob: data:; media-src 'self' blob:; connect-src 'self'; worker-src blob:; form-action 'none'; base-uri 'none'; frame-ancestors 'none'; object-src 'none'"};
const landing="<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Imagination Station · Private Invitation</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:18px;background:#091629;color:white;font:16px system-ui}main{max-width:480px;background:#182940;padding:28px;border-radius:22px;border:1px solid #548b96}h1{color:#94f6e4}p{line-height:1.5;color:#b7cadf}</style></head><body><main><h1>✦ Imagination Station</h1><p id=\"status\">This independent creator studio opens only with the invitation link from its creator.</p><p>One imagination. One studio.</p></main><script>(async()=>{const t=location.hash.slice(1),p=document.getElementById(\"status\");if(!t)return;history.replaceState(null,\"\",location.pathname);p.textContent=\"Opening your creator studio…\";try{const r=await fetch(\"/unlock\",{method:\"POST\",headers:{\"content-type\":\"text/plain\"},credentials:\"same-origin\",body:t});if(!r.ok){p.textContent=\"That invitation link is invalid or has been revoked. Ask your creator for a new one.\";return;}location.replace(\"/studio\");}catch(e){p.textContent=\"Could not connect. Check your connection and try the invitation again.\";}})();</script></body></html>";
function reply(res,status,body,kind="text/plain; charset=utf-8",more={}){res.writeHead(status,{...HEAD,"content-type":kind,...more});res.end(body);}
function eq(a,b){return a.length===b.length&&crypto.timingSafeEqual(Buffer.from(a),Buffer.from(b));}
function authorized(req){const v=(req.headers.cookie||"").split(";").map(x=>x.trim()).find(x=>x.startsWith(COOKIE+"="))?.slice(COOKIE.length+1)||"";return eq(v,VALUE);}
const hits=new Map();
function rateOK(req){const ip=String(req.headers["x-forwarded-for"]||req.socket.remoteAddress||"").split(",")[0];const hash=crypto.createHash("sha256").update(ip).digest("hex");const now=Date.now();let entry=hits.get(hash)||{window:now,count:0};if(now-entry.window>60000)entry={window:now,count:0};entry.count++;hits.set(hash,entry);if(hits.size>3000)hits.clear();return entry.count<120;}
const DEMO=Object.freeze({
 "/demo/finished-24s.mp4":{file:"finished-24s.mp4",type:"video/mp4"},
 "/demo/take-01.mp4":{file:"take-01.mp4",type:"video/mp4"},
 "/demo/take-02.mp4":{file:"take-02.mp4",type:"video/mp4"},
 "/demo/theme.mp3":{file:"theme.mp3",type:"audio/mpeg"},
 "/demo/poster.jpg":{file:"poster.jpg",type:"image/jpeg"},
 "/demo/ruc-world.jpg":{file:"ruc-world.jpg",type:"image/jpeg"}
});
const media=new Map(Object.entries(DEMO).map(([route,detail])=>[route,{type:detail.type,body:fs.readFileSync(path.join(__dirname,"demo",detail.file))}]));
function serveDemo(req,res,loc){
 if(!authorized(req))return reply(res,404,"Not found");
 const file=media.get(loc);if(!file)return reply(res,404,"Not found");
 const total=file.body.length;let start=0,end=total-1,status=200;
 const range=req.headers.range;
 if(range){
  const match=/^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if(!match||(!match[1]&&!match[2]))return reply(res,416,"Invalid range","text/plain",{"content-range":"bytes */"+total,"accept-ranges":"bytes"});
  if(!match[1]){const suffix=Number(match[2]);if(!Number.isSafeInteger(suffix)||suffix<1)return reply(res,416,"Invalid range","text/plain",{"content-range":"bytes */"+total});start=Math.max(0,total-suffix);}
  else{start=Number(match[1]);end=match[2]?Number(match[2]):total-1;}
  if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>=total||end<start)return reply(res,416,"Invalid range","text/plain",{"content-range":"bytes */"+total});
  end=Math.min(end,total-1);status=206;
 }
 const headers={...HEAD,"content-type":file.type,"accept-ranges":"bytes","content-length":end-start+1};
 if(status===206)headers["content-range"]=`bytes ${start}-${end}/${total}`;
 res.writeHead(status,headers);if(req.method==="HEAD")res.end();else res.end(file.body.subarray(start,end+1));
}
http.createServer(async (req,res)=>{
 if(!rateOK(req))return reply(res,429,"Rate limited");
 const loc=new URL(req.url,"http://localhost").pathname;
 if(req.method==="GET"&&loc==="/health")return reply(res,200,JSON.stringify({app:"imagination-station-share",version:"39",status:"ready",ok:true}),"application/json");
 if(req.method==="GET"&&loc==="/readiness"){
   if(!authorized(req))return reply(res,401,JSON.stringify({status:"denied"}),"application/json");
   const assets={};for(const [route,blob] of media)assets[route]={bytes:blob.body.length,type:blob.type};
   return reply(res,200,JSON.stringify({app:"imagination-station",version:"39",status:"ready",access:"invitation_session",ai_provider:"disabled",creator_cloud_accounts:"not_enabled",examples:assets}),"application/json");
 }
 if(req.method==="GET"&&loc==="/robots.txt")return reply(res,200,"User-agent: *\nDisallow: /\n");
 if(req.method==="GET"&&loc==="/")return reply(res,200,landing,"text/html; charset=utf-8",{"content-security-policy":"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'none'; base-uri 'none'; frame-ancestors 'none'"});
 if(req.method==="POST"&&loc==="/unlock"){
   const origin=req.headers.origin;
   if(origin && origin!=="https://"+req.headers.host)return reply(res,403,"Forbidden");
   if(Number(req.headers["content-length"]||0)>150)return reply(res,413,"Too large");
   const parts=[];let len=0;for await(const chunk of req){len+=chunk.length;if(len>150)return reply(res,413,"Too large");parts.push(chunk);}
   const attempt=Buffer.concat(parts).toString("utf8");
   if(!eq(attempt,TOKEN))return reply(res,403,"Invalid invitation");
   return reply(res,204,"","text/plain",{"set-cookie":COOKIE+"="+VALUE+"; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800"});
 }
 if(req.method==="GET"&&loc==="/studio"){
   if(!authorized(req))return reply(res,303,"","text/plain",{"location":"/"});
   return reply(res,200,guest,"text/html; charset=utf-8");
 }
 if((req.method==="GET"||req.method==="HEAD")&&Object.hasOwn(DEMO,loc))return serveDemo(req,res,loc);
 if(req.method==="POST"&&loc==="/logout")return reply(res,303,"","text/plain",{"location":"/","set-cookie":COOKIE+"=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"});
 return reply(res,404,"Not found");
}).listen(PORT,"0.0.0.0",()=>console.log("Imagination Station guest server v39 ready"));