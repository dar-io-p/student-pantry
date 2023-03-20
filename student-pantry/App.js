import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigators/StackNavigator";

import { auth } from "./src/store/config";
import { signOut } from "firebase/auth";

export default function App() {
  signOut(auth);
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
