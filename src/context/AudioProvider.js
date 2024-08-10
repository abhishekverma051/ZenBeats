import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
export const AudioContext = createContext();

const AppProvider = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState([]);
   const [permissionError, setPermissionError] = useState(false);
  const permissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "This app needs to read your audio files!",
      [
        {
          text: "Okay",
          onPress: () => getPermission(),
        },
        {
          text: "Cancel",
          onPress: () => permissionAlert(),
        },
      ]
    );
  };

  const getAudioFiles = async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
      });
      setAudioFiles(media.assets);
    } catch (error) {
      console.error("Error getting audio files: ", error);
    }
  };

  const getPermission = async () => {
    try {
      const permission = await MediaLibrary.getPermissionsAsync();
      if (permission.granted) {
        getAudioFiles();
      } else if (permission.canAskAgain) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "denied") {
          permissionAlert();
        } else if (status === "granted") {
          getAudioFiles();
        }
      }else if(!permission.granted && !permission.canAskAgain){
         setPermissionError(true);
      }
    } catch (error) {
      console.error("Error requesting permission: ", error);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <AudioContext.Provider value={{ audioFiles }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AppProvider;
