import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigators/StackNavigation"; // Assuming StackNavigation is your main navigator
import AudioProvider from "./src/context/AudioProvider";

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C3423F",
    alignItems: "center",
    justifyContent: "center",
  },
});
