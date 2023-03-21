import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import Dialog from "react-native-dialog";
import {
  getGroupShoppingList,
  addFoodGroupShoppingList,
  removeFoodGroupShoppingList,
} from "../store/shoppingConfig";

export default function ({ style, groupid, inGroup }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [data, setData] = useState([]);
  const [dbUpdate, setDPUpdate] = useState(false);

  useEffect(() => {
    inGroup &&
      getGroupShoppingList(groupid)
        .then((newdata) => {
          setData(newdata);
          setDPUpdate(false);
        })
        .catch((err) =>
          console.log("error getting group shooping list: " + err)
        );
  }, [dialogVisible, dbUpdate]);

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleAdd = async () => {
    addFoodGroupShoppingList(groupid, newItemText)
      .then(() => {
        console.log(
          "Successfully added to shared shopping list to %s",
          groupid
        );
        setDPUpdate(true);
      })
      .catch((err) => console.log(err));
    setDialogVisible(false);
  };

  const handleDelete = (item) => {
    removeFoodGroupShoppingList(groupid, item)
      .then(() => {
        console.log("Successfully Removed from shopping list");
        setDPUpdate(true);
        setDialogVisible(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={style}>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>New Item</Dialog.Title>
        <Dialog.Input onChangeText={(t) => setNewItemText(t)} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Add" onPress={handleAdd} />
      </Dialog.Container>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Shopping List</Text>
          <TouchableOpacity
            onPress={() => setDialogVisible(true)}
            style={styles.centeredContainer}
          >
            <Text style={{ fontSize: 30, right: 5 }}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.rowitem}>
                <Text style={styles.itemText}>- {item}</Text>
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={styles.centeredContainer}
                >
                  <Text style={{ fontSize: 16, right: 5, fontWeight: "bold" }}>
                    -
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 1,
    alignItems: 1,
    padding: 2,
  },
  item: {
    left: 20,
    paddingVertical: 2,
  },
  title: {
    padding: 2,
    fontSize: 25,
    left: 8,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 20,
    left: 10,
  },
  rowitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 1,
    margin: 1,
  },
});
