import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "../store/config";
import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from "../screens/LoginScreen";
import Registration from "../screens/Registration";
import TabNavigator from "./TabNavigator";

import { updateExpired } from "../store/config";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (user) => {
    console.log("AUTH STATE CHANGE");
    if (user) {
      updateExpired(user.displayName)
        .then(() => {
          console.log("Updated Expired");
          setUser(user.displayName);
        })
        .catch((err) => console.log(err));
    } else {
      setUser();
      console.log("User not signed in");
    }
  });

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="registration" component={Registration} />
      </Stack.Navigator>
    );
  } else
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="app"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
}
