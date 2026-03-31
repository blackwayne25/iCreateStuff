import React from "react";
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
});