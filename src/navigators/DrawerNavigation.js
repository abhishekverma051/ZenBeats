import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
const drawer = createDrawerNavigator();
import AudioList from '../screens/app/AudioList';
import SettingScreen from '../screens/auth/SettingScreen'

import React from 'react'
const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="AudioList" component={AudioList} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
    </Drawer.Navigator>
  );
}