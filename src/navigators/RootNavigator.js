import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import AppNavigator from "./TabNavigator";
import SplashScreen from "../screens/auth/SplashScreen";
import Player from "../screens/app/Player";
import PlaylistScreen from "../screens/app/PlayList";
import PlaylistDetailScreen from "../screens/app/PlaylistDetailScreen";
import FavoriteSongsScreen from "../screens/app/FavoriteSongs";
import DrawerNavigation from "./DrawerNavigation";
import QueueScreen from "../screens/app/QueueScreen";
import { AudioContext } from "../context/AudioProvider";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const navigation = useNavigation();

  useEffect(() => {
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
        console.log(
          "Notification Data:",
          response.notification.request.content.data
        );

        const { audioUri, filename, audioId } =
          response.notification.request.content.data;

        console.log("Audio URI:", audioUri);
        console.log("Audio URI:", filename);

        if (audioUri) {
          navigation.navigate("Player", {
            audioUri: audioUri,
            filename: filename,
            audioId: audioId,
          });
        } else {
          console.warn("No audioUri found in the notification data.");
        }
      });

    return () => {
      responseSubscription.remove();
    };
  }, [navigation]);



  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={AppNavigator} />
      <Stack.Screen name="QueueScreen" component={QueueScreen} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen
        name="PlaylistDetailScreen"
        component={PlaylistDetailScreen}
      />
      <Stack.Screen name="FavoriteSongs" component={FavoriteSongsScreen} />
    </Stack.Navigator>
  );
}
