import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./TabNavigator";  
import SplashScreen from "../screens/auth/SplashScreen";
import Player from "../screens/app/PlayList";
import PlaylistScreen from "../screens/app/PlayList";
import PlaylistDetailScreen from "../screens/app/PlaylistDetailScreen";
import FavoriteSongsScreen from "../screens/app/FavoriteSongs"
import DrawerNavigation from "./DrawerNavigation";
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
       <Stack.Screen name="Player" component={Player}  options={{ headerShown: false }}/>

      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen name="PlaylistDetailScreen" component={PlaylistDetailScreen} />
      <Stack.Screen name="FavoriteSongs" component={FavoriteSongsScreen} />

    </Stack.Navigator>
  );
}
