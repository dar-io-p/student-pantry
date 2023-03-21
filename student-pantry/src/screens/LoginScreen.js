import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import colours from "../constants/colours";

import { loginUser } from "../store/auth-config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="E-mail"
        onChangeText={(t) => setEmail(t)}
        autoCapitalize="none"
        keyboardType="email-address"
      ></TextInput>
      <TextInput
        style={styles.textinput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(t) => setPass(t)}
      ></TextInput>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          loginUser(email, pass)
            .then(() => {
              console.log("successfully logged in");
            })
            .catch((err) => alert("E-mail or password is incorrect"))
        }
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <View style={{ height: "2%" }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("registration")}
      >
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "55%",
    height: "8%",
    backgroundColor: colours.green,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textinput: {
    width: "60%",
    height: "7%",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});
