import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "../store/config";
import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from "../screens/LoginScreen";
import Registration from "../screens/Registration";
import TabNavigator from "./TabNavigator";

import EXP_Cards from "../Experiment/ExperimentScreen";

import { updateExpired } from "../store/config";

const Stack = createStackNavigator();

export default function StackNavigator() {
  // if (!user) {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="login" component={LoginScreen} />
  //       <Stack.Screen name="registration" component={Registration} />
  //     </Stack.Navigator>
  //   );
  // } else
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
          name="app"
          component={TabNavigator}
          options={{ headerShown: false }}
        /> */}
      <Stack.Screen name="app" component={EXP_Cards} />
    </Stack.Navigator>
  );
}
