import React from "react";
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
});