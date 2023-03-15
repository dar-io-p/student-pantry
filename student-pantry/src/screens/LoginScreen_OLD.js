import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import colours from "../constants/colours";

export default function LoginScreen({ navigation }) {
  const [userName, onChangeUser] = React.useState("Useless Text");
  const [pass, onChangePass] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="username"
        onChangeText={onChangeUser}
      ></TextInput>
      <TextInput
        style={styles.textinput}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={onChangePass}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={() => alert("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <View style={{ height: "2%" }} />
      <TouchableOpacity style={styles.button} onPress={() => alert("Login")}>
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
