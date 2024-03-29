import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { registerUser } from "../store/auth-config";
import colours from "../constants/colours";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 23 }}>Register Here!</Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Display Name"
          onChangeText={(displayName) => setDisplayName(displayName)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          registerUser(email, password, displayName)
            .then((val) => alert("successfully registered"))
            .catch((err) => alert("Error registering"));
        }}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    width: "55%",
    height: "8%",
    backgroundColor: colours.green,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
