import React from "react";
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
});