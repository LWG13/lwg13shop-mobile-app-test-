import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react"

export default function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const label = route.name;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            <Text style={{color: "white"}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#BF77F6",
    color: "white",
    paddingVertical: 10,
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  tabButton: {
    padding: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "pink",
  },
});