import React, { useEffect,useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigators/RootNavigator";
import AudioProvider from "./src/context/AudioProvider";
import * as Notifications from "expo-notifications";
import { AudioContext } from "./src/context/AudioProvider";


const handleNotification = async (notification) => {
  console.log("Received notification: ", notification);
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const setupNotifications = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
      android: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });

    if (status !== "granted") {
      console.warn("Notification permissions not granted");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Song",
        body: "Click to play the song!",
        data: {
          audioUri: "file:///storage/emulated/0/Download/Me-And-You.mp3",
          filename: "Me-And-You.mp3",
          audioId: "1000022410",
        },
      },
      trigger: {
        seconds: 1,
      },
    });

    console.log("Notification scheduled successfully");
  } catch (error) {
    console.error("Error setting up notifications:", error);
  }
};

export default function App() {
  
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AudioProvider>
  );
}
