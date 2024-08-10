import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./TabNavigator"; // Your Tab Navigator
import SplashScreen from "../screens/auth/SplashScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={AppNavigator} />
    </Stack.Navigator>
  );
}
