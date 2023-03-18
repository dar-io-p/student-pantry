import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigators/TabNavigator";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import {auth} from './src/store/config'
import { onAuthStateChanged } from "firebase/auth";


import Login from "./src/Login.js";
import Registration from "./src/Registration";
import Header from "./components/Header";
import Dashboard from "./src/Dashboard.js";

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (user) =>  {
    if (user) {
      setUser(user.displayName);
    } else {
      console.log("User not signed in")
    }
  })

  if (!user) {
    return (
      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ 
          headerTitle: () => <Header name="Pantry App" />,
           headerStyle:{
            height:150,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
           }
         }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ 
          headerTitle: () => <Header name="Pantry App" />,
           headerStyle:{
            height:150,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
           }
         }}
      />
    </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ 
          headerTitle: () => <Header name="Dashboard" />,
           headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColor:'#000',
            elevation:25
           }
         }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}