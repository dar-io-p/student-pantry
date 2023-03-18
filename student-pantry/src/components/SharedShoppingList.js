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
  getShoppingList,
  addFoodShoppingList,
  removeFoodShoppingList,
} from "../store/shoppingConfig";

import { auth } from "../store/config";

export default function ({ style, groupid }) {
  const uid = auth.currentUser ? auth.currentUser.displayName : "";

  const [dialogVisible, setDialogVisible] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [data, setData] = useState([]);
  const [dbUpdate, setDPUpdate] = useState(false);

  useEffect(() => {
    getShoppingList(uid)
      .then((newdata) => {
        setData(newdata);
        setDPUpdate(false);
      })
      .catch((err) => console.log(err));
  }, [dialogVisible, dbUpdate]);

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleAdd = async () => {
    addFoodShoppingList(uid, newItemText).then(() => {
      console.log("Successfully added to shopping list");
      setDPUpdate(true);
    });
    setDialogVisible(false);
  };

  const handleDelete = (item) => {
    removeFoodShoppingList(uid, item).then(() => {
      console.log("Successfully Removed from shopping list");
      setDPUpdate(true);
      setDialogVisible(false);
    });
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
