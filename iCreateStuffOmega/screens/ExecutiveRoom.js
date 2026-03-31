import React,{useState}from"react";
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
});