import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function CustomHeader({children}) {
  return (
  <View >
    <View style={styles.container}>
      <Text style={styles.title}>Lwg13Shop</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🔍</Text>
      </TouchableOpacity>
    </View>
    {children}
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#BF77F6",
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  }
});