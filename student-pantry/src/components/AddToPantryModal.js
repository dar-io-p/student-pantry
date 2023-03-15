import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import colours from "../constants/colours";
import DateTimePicker from "@react-native-community/datetimepicker";

import { addFood } from "../store/config";

export function AddToPantryModal(props) {
  const today = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState("");
  const [pd, setPD] = useState(today);
  const [ub, setUB] = useState(today);

  const id = "test123";

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredContainer}>
          <View style={styles.modalView}>
            <Text style={{ fontWeight: "bold", paddingTop: 15 }}>New Item</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Item"
                placeholderTextColor="grey"
                onChangeText={(text) => setItem(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text>Purchase Date</Text>
              <DateTimePicker
                value={pd}
                mode="date"
                onChange={(event, date) => setPD(date)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text>Use By</Text>
              <DateTimePicker
                value={ub}
                mode="date"
                onChange={(event, date) => setUB(date)}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: colours.green,
                  borderRadius: 10,
                  margin: 10,
                }}
              >
                <Button
                  title="ADD"
                  onPress={() => {
                    addFood(id, item, false, ub, false, pd);
                    setModalVisible(!modalVisible);
                  }}
                  color="black"
                />
              </View>
              <View
                style={{
                  backgroundColor: colours.alertRed,
                  borderRadius: 10,
                  margin: 10,
                }}
              >
                <Button
                  title="CLOSE"
                  onPress={() => setModalVisible(!modalVisible)}
                  color={colours.white}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{ marginRight: "10%" }}
      >
        <AntDesign name="pluscircleo" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    margin: 15,
    flex: 1,
  },
});
