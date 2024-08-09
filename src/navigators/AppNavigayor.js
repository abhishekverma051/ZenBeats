import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from '../screens/app/AudioList';
import PlayList from '../screens/app/PlayList';
import Player from '../screens/app/Player';
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigator(){
    return (
      <Tab.Navigator screenOptions={{headerTitleAlign:'center'}}>
        <Tab.Screen
          name="AudioList"
          component={AudioList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="headset" size={size} color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="PlayList"
          component={PlayList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="compact-disc" size={size} color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Player"
          component={Player}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="library-music" size={size} color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />
      </Tab.Navigator>
    );
}