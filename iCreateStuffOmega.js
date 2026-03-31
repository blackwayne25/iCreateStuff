const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "iCreateStuffOmega");

// FULL PROJECT STRUCTURE
const structure = {
  src: {
    screens: {
      "Splash.js": `import React,{useEffect} from "react";
import{View,Text,StyleSheet} from"react-native";
export default function Splash({navigation}){
  useEffect(()=>{
    const t=setTimeout(()=>navigation.replace("Home"),1500);
    return()=>clearTimeout(t);
  },[]);
  return(<View style={styles.c}><Text style={styles.l}>iCreateStuff OMEGA</Text></View>);
}
const styles=StyleSheet.create({
  c:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#000"},
  l:{fontSize:46,fontWeight:"bold",color:"#ff9900"}
});`,
      "Home.js": `import React from "react";
import {View,Text,Button,StyleSheet} from "react-native";
export default function Home({navigation}){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Creative Hub</Text>
      <View style={styles.buttons}>
        <Button title="Creative Room" onPress={()=>navigation.navigate("Room")}/>
        <Button title="Executive Room" color="#ff9900" onPress={()=>navigation.navigate("ExecutiveRoom")}/>
        <Button title="Story Canvas" color="#00bfff" onPress={()=>navigation.navigate("StoryCanvas")}/>
        <Button title="Library" color="#32cd32" onPress={()=>navigation.navigate("Library")}/>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,padding:24,justifyContent:"center",alignItems:"center",backgroundColor:"#000"},
  title:{fontSize:34,fontWeight:"bold",color:"#ff9900",marginBottom:24},
  buttons:{width:"100%",justifyContent:"space-between",height:200}
});`,
      "Room.js": `import React from "react";
import{View,Text,ScrollView,StyleSheet}from"react-native";
import VideoAvatar from"../components/VideoAvatar";
import IdeaCard from"../components/IdeaCard";
import BigCircleButton from"../components/BigCircleButton";

export default function Room(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Creative Room</Text>
      <Text style={styles.subtitle}>AI Co‑Pilots Online 🔥</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <VideoAvatar name="Creator AI"/>
        <VideoAvatar name="Entrepreneur AI"/>
        <VideoAvatar name="Executive AI"/>
        <IdeaCard title="Universe Zap" description="Tap Big ⭕ to launch ideas 🌌"/>
      </ScrollView>
      <BigCircleButton/>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,padding:20,backgroundColor:"#000"},
  title:{fontSize:28,fontWeight:"bold",color:"#ff9900",marginBottom:12},
  subtitle:{fontSize:16,color:"#ccc",marginBottom:20},
  scroll:{paddingBottom:40}
});`,
      "ExecutiveRoom.js": `import React,{useState}from"react";
import{View,Text,TextInput,Button,StyleSheet}from"react-native";
import{checkPassword}from"../services/AuthService";
export default function ExecutiveRoom(){
  const[pw,setPw]=useState("");
  const[unlocked,setUnlocked]=useState(false);
  return(
    <View style={styles.container}>
      {!unlocked?(
        <>
          <Text style={styles.prompt}>Executive Password</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="Password" onChangeText={setPw}/>
          <Button title="Unlock" color="#ff9900" onPress={()=>{if(checkPassword(pw))setUnlocked(true)}}/>
        </>
      ):<Text style={styles.welcome}>Access Granted 🚀</Text>}
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,padding:24,justifyContent:"center"},
  prompt:{fontSize:18,marginBottom:12,color:"#fff"},
  input:{borderWidth:1,padding:8,marginBottom:12,borderRadius:6},
  welcome:{fontSize:24,fontWeight:"bold",color:"#32cd32"}
});`,
      "StoryCanvas.js": `import React from "react";
import{View,Text,StyleSheet}from"react-native";
export default function StoryCanvas(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Story Canvas</Text>
      <Text style={styles.subtitle}>Drag & drop ideas here</Text>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,padding:24,justifyContent:"center",alignItems:"center"},
  title:{fontSize:28,fontWeight:"bold",color:"#ff9900"},
  subtitle:{fontSize:16,color:"#ccc"}
});`,
      "Library.js": `import React from "react";
import{View,Text,FlatList,StyleSheet}from"react-native";
const projects=[{id:"1",title:"Idea 1"},{id:"2",title:"Idea 2"}];
export default function Library(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Library</Text>
      <FlatList data={projects}keyExtractor={item=>item.id}renderItem={({item})=><Text style={styles.item}>{item.title}</Text>}/>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,padding:24,backgroundColor:"#000"},
  title:{fontSize:28,fontWeight:"bold",color:"#ff9900",marginBottom:12},
  item:{fontSize:18,padding:8,borderBottomWidth:1,borderColor:"#444",color:"#fff"}
});`,
    },
    components: {
      "VideoAvatar.js": `import React from "react";
import{View,Text,Image,StyleSheet}from"react-native";
export default function VideoAvatar({name,avatarSource}){
  return(
    <View style={styles.container}>
      <Image source={avatarSource||require("../assets/placeholder-character.png")} style={styles.avatar}/>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{alignItems:"center",margin:10},
  avatar:{width:60,height:60,borderRadius:30,backgroundColor:"#333"},
  name:{marginTop:4,fontSize:12,color:"#fff"}
});`,
      "IdeaCard.js": `import React from "react";
import{View,Text,StyleSheet}from"react-native";
export default function IdeaCard({title,description}){
  return(
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}
const styles=StyleSheet.create({
  card:{backgroundColor:"#222",padding:12,margin:8,borderRadius:10},
  title:{color:"#fff",fontWeight:"bold",fontSize:16},
  desc:{color:"#ccc",fontSize:14}
});`,
      "BigCircleButton.js": `import React from "react";
import{TouchableOpacity,Text,StyleSheet}from"react-native";
import{useAIInteraction}from"../hooks/useAIInteraction";
export default function BigCircleButton(){
  const{sendMessage}=useAIInteraction();
  return(
    <TouchableOpacity style={styles.button}onPress={()=>sendMessage("OMEGA ZAP!")}>
      <Text style={styles.text}>⭕</Text>
    </TouchableOpacity>
  );
}
const styles=StyleSheet.create({
  button:{
    width:100,height:100,borderRadius:50,backgroundColor:"#ff9900",justifyContent:"center",alignItems:"center",position:"absolute",bottom:40,right:40
  },
  text:{fontSize:42,color:"#fff",fontWeight:"bold"}
});`,
    },
    services: {
      "OpenAIService.js": `export async function sendToAI(prompt){return "AI GENERATED: "+prompt;}`,
      "AuthService.js": `export function checkPassword(pw){return pw==="YourSecret";}`,
      "UpdateService.js": `export async function fetchLatestAI(){return{creator:"v2.1",entrepreneur:"v2.1",executive:"v2.1"};}`,
    },
    hooks: {
      "useAIInteraction.js": `import{useState}from"react";
export function useAIInteraction(){
  const[messages,setMessages]=useState([]);
  const sendMessage=msg=>{
    setMessages(prev=>[...prev,{sender:"User",text:msg}]);
    setMessages(prev=>[...prev,{sender:"AI",text:"OMEGA RESPONSE: "+msg}]);
  };
  return{messages,sendMessage};
}`,
    },
    assets: {"logo.png":"", "placeholder-character.png":"","placeholder-bg.jpg":""},
  },
  files: {
    "App.js": `import React from "react";
import{NavigationContainer}from"@react-navigation/native";
import{createStackNavigator}from"@react-navigation/stack";
import Splash from"./src/screens/Splash";
import Home from"./src/screens/Home";
import Room from"./src/screens/Room";
import ExecutiveRoom from"./src/screens/ExecutiveRoom";
import StoryCanvas from"./src/screens/StoryCanvas";
import Library from"./src/screens/Library";
const Stack=createStackNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash"component={Splash}/>
        <Stack.Screen name="Home"component={Home}/>
        <Stack.Screen name="Room"component={Room}/>
        <Stack.Screen name="ExecutiveRoom"component={ExecutiveRoom}/>
        <Stack.Screen name="StoryCanvas"component={StoryCanvas}/>
        <Stack.Screen name="Library"component={Library}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}`,
    "package.json": `{
  "name":"iCreateStuffOmega",
  "version":"2.0.0",
  "main":"App.js",
  "scripts":{"start":"expo start"},
  "dependencies":{"react":"18.2.0","react-native":"0.72.4","@react-navigation/native":"6.1.7","@react-navigation/stack":"6.3.20","expo":"48.0.0"}
}`,
  }
};

// Create folders & files
function create(base,obj){
  if(!fs.existsSync(base)) fs.mkdirSync(base,{recursive:true});
  for(const key in obj){
    const val=obj[key];
    const curPath=path.join(base,key);
    if(typeof val==="string") fs.writeFileSync(curPath,val);
    else create(curPath,val);
  }
}

create(root,structure.src);
create(root,structure.files);

console.log("✅ iCreateStuffOmega scaffold created! Engage Hyperdrive! 🚀");
