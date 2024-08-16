 import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigators/RootNavigator";  
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
