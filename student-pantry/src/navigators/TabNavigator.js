import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";

import colours from "../constants/colours";

import PantryScreen from "../screens/PantryScreen";
import GroupScreen from "../screens/GroupScreen";
import AdviceScreen from "../screens/AdviceScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="pantry" component={PantryScreen} />
      <Tab.Screen name="group" component={GroupScreen} />
      <Tab.Screen name="advice" component={AdviceScreen} />
    </Tab.Navigator>
  );
}

//Defining Styling for bottom tab
const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: "8%",
        bottom: 20,
        backgroundColor: colours.grey,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <View
            style={{
              flex: 1,
              backgroundColor: isFocused
                ? colours.selectedGreen
                : colours.green,
              borderRadius: 10,
              margin: "1%",
            }}
            key={route.key}
          >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.key}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: isFocused ? "black" : "white",
                  fontWeight: "bold",
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
