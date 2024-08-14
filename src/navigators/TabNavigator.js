import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AudioList from "../screens/app/AudioList";
import PlayList from "../screens/app/PlayList";
import Player from "../screens/app/Player";
import SettingScreen from "../screens/auth/SettingScreen";
import AboutScreen from "../screens/auth/AboutScreen";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import color from "../miscs/color";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Audio List" component={AudioList} />
      <Drawer.Screen name="Setting Screen" component={SettingScreen} />
      <Drawer.Screen name = "About Screen" component={AboutScreen}/>
    </Drawer.Navigator>
  );
}

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
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNavigator}
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
            <FontAwesome5 name="compact-disc" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-music" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
