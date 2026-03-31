import React from "react";
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
});