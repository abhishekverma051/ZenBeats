import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";

export default function Player() {
  return (
    <LinearGradient colors={color.LG} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.text}>Player</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
});
