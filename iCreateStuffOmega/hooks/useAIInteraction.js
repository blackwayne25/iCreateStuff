import{useState}from"react";
export function useAIInteraction(){
  const[messages,setMessages]=useState([]);
  const sendMessage=msg=>{
    setMessages(prev=>[...prev,{sender:"User",text:msg}]);
    setMessages(prev=>[...prev,{sender:"AI",text:"OMEGA RESPONSE: "+msg}]);
  };
  return{messages,sendMessage};
}