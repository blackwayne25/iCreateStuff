import React from "react";
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
});