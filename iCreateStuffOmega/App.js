import React from "react";
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
}