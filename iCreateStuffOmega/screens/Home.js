import React from "react";
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
});