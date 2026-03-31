import React from "react";
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
});