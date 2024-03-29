import React, { useEffect, useState } from "react";

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

import {
  joinGroup,
  leaveGroup,
  getGroupID,
  generateNumber,
  createGroup,
  auth,
} from "../store/config";

export function GroupModal({ inGroup, setDBUpdate }) {
  const uid = auth.currentUser ? auth.currentUser.displayName : "";
  const [modalVisible, setModalVisible] = useState(false);
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
            <ModalContents
              inGroup={inGroup}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setDBUpdate={setDBUpdate}
              uid={uid}
            />
            <View
              style={{
                backgroundColor: colours.alertRed,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Button
                title="CLOSE"
                onPress={() => setModalVisible(!modalVisible)}
                color="white"
              />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{ marginRight: "10%" }}
      >
        <AntDesign name="menuunfold" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

function ModalContents({
  inGroup,
  setModalVisible,
  modalVisible,
  setDBUpdate,
  uid,
}) {
  const handleLeaveGroup = () => {
    leaveGroup(groupid, uid)
      .then((result) => {
        if (result) console.log("Success");
        else console.log("Fail");
        setDBUpdate(true);
      })
      .catch((err) => console.log(err));
    setModalVisible(!modalVisible);
  };

  const [groupid, setgroupid] = useState("");

  if (inGroup) {
    useEffect(() => {
      getGroupID(uid)
        .then((val) => {
          setgroupid(val);
        })
        .catch((err) => console.log(err));
    }, []);

    //USER IS IN GROUP
    return (
      <View>
        <Text style={{ fontSize: 20 }}>Group Code: {groupid}</Text>
        <View style={styles.button}>
          <Button
            title="Leave Group"
            onPress={handleLeaveGroup}
            color="black"
          />
        </View>
      </View>
    );
  }

  const handleJoinGroup = () => {
    joinGroup(groupid, uid).then((result) => {
      if (result) console.log("Success");
      else console.log("FAILED TO JOIN GROUP");
      setDBUpdate(true);
    });
    setModalVisible(!modalVisible);
  };

  const [generatedID, setGeneratedID] = useState("");

  //USER NOT IN GROUP
  useEffect(() => {
    generateNumber().then((val) => {
      setGeneratedID(val);
    });
  }, []);

  const handleCreateGroup = () => {
    createGroup(generatedID, uid).then((res) => {
      if (res) console.log("success");
      else console.log("Failure");
      setDBUpdate(true);
    });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>{generatedID}</Text>
      <View style={styles.button}>
        <Button
          title="Create Group with Group ID"
          color={colours.black}
          onPress={() => {
            setModalVisible(!modalVisible);
            handleCreateGroup();
          }}
        />
      </View>

      <Text style={{ fontSize: 20, paddingVertical: 10 }}>- OR -</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Group ID"
          placeholderTextColor="grey"
          textAlign="center"
          keyboardType="numeric"
          onChangeText={(t) => setgroupid(t)}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Join Group with Group ID"
          color={colours.black}
          onPress={handleJoinGroup}
        />
      </View>
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
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 15,
    flex: 1,
    fontSize: 20,
  },
  button: {
    borderRadius: 8,
    backgroundColor: colours.green,
    marginVertical: 8,
  },
});
