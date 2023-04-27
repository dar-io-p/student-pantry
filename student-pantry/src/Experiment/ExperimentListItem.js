import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import colours from "../constants/colours";

import { foodData } from "./ExperimentData";

//{id: "Cheese",isLow: true, shared: true, useBy: "2023 04 15", purchaseDate: "2023 07 03",}
export const ExperimentListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const col = props.isLow && props.isLow ? colours.alertRed : colours.green;
  const fontCol = props.isLow && props.isLow ? colours.white : colours.black;

  //formatting of date strings
  const ub_date = new Date(props.useBy);
  const useby = ub_date.toLocaleDateString("en-uk");

  const pd_date = new Date(props.purchaseDate);
  const purchaseDate = pd_date.toLocaleDateString("en-uk");

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[styles.container, { backgroundColor: col }]}
    >
      <View style={styles.box}>
        <ListModal
          shared={props.shared}
          isLow={props.isLow}
          visible={modalVisible}
          setModalVisible={setModalVisible}
          id={props.id}
          updateState={props.updateState}
        />
        <Text style={[styles.title, { color: fontCol }]}>{props.id}</Text>
        <Text style={[styles.minorText, { color: fontCol }]}>{useby}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListModal = ({
  isLow,
  shared,
  visible,
  setModalVisible,
  id,
  updateState,
}) => {
  const options = [
    isLow ? "Mark High" : "Mark Low",
    shared ? "Remove from shared pantry" : "Add to shared pantry",
    "Waste",
    "Delete",
    "Get info",
  ];
  const optionFuncs = [
    () => updateState("low-" + id),
    () => updateState("shared-" + id),
    () => updateState("waste-" + id),
    () => updateState("delete-" + id),
    () => updateState("info-" + id),
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        alert("Modal has been closed.");
        setModalVisible(!visible);
      }}
    >
      <View style={styles.centeredContainer}>
        <View style={styles.modalView}>
          {options.map((val, ind) => {
            return (
              <View key={ind} style={styles.button}>
                <Button
                  title={options[ind]}
                  onPress={() => {
                    setModalVisible(!visible);
                    optionFuncs[ind]();
                  }}
                  color="black"
                />
              </View>
            );
          })}

          <View style={styles.closeButton}>
            <Button
              title="CLOSE"
              onPress={() => setModalVisible(!visible)}
              color="white"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  minorText: {
    fontSize: 20,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
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
  closeButton: {
    backgroundColor: colours.alertRed,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: colours.grey,
    borderRadius: 10,
    marginTop: 10,
  },
});
