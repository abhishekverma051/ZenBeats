import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "../screens/app/AudioList";
import PlayList from "../screens/app/PlayList";
import Player from "../screens/app/Player";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import color from "../miscs/color";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: color.TAB,
          borderTopWidth: 0,
        },
        headerBackgroundContainerStyle: {
          backgroundColor: color.UP,
        },
        headerBackground: () => <View style={{ backgroundColor: color.UP }} />,
        headerTintColor: "white",
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="AudioList"
        component={AudioList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="headset" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PlayList"
        component={PlayList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="compact-disc" size={size} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-music" size={size} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
