import React,{useEffect} from "react";
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
});