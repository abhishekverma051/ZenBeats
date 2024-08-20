import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AudioContext = createContext();

const STORAGE_KEY_PLAYLISTS = "@playlists";
const STORAGE_KEY_BLOCKED_SONGS = "@blocked_songs";
const STORAGE_KEY_QUEUE = "@queue";

const AudioProvider = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [blockedSongs, setBlockedSongs] = useState([]);
  const [queue, setQueue] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  const getPermission = async () => {
    try {
      const permission = await MediaLibrary.getPermissionsAsync();
      if (permission.granted) {
        loadAudioFiles();
      } else if (permission.canAskAgain) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "denied") {
          permissionAlert();
        } else if (status === "granted") {
          loadAudioFiles();
        }
      } else {
        setPermissionError(true);
      }
    } catch (error) {
      console.error("Error requesting permission: ", error);
    }
  };

  const loadAudioFiles = async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
      });
      setAudioFiles(media.assets);
    } catch (error) {
      console.error("Error getting audio files: ", error);
    }
  };

  const loadQueue = async () => {
    try {
      const queueString = await AsyncStorage.getItem(STORAGE_KEY_QUEUE);
      if (queueString) {
        setQueue(JSON.parse(queueString));
      }
    } catch (error) {
      console.error("Error loading queue: ", error);
    }
  };

  const saveQueue = async (queue) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queue));
    } catch (error) {
      console.error("Error saving queue: ", error);
    }
  };

  const addToQueue = async (song) => {
    const updatedQueue = [...queue, song];
    setQueue(updatedQueue);
    await saveQueue(updatedQueue);
  };

  const removeFromQueue = (item) => {
    setQueue((prevQueue) => prevQueue.filter((song) => song.id !== item.id));
  };

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
        },
      ]
    );
  };

  const loadPlaylists = async () => {
    try {
      const playlistsString = await AsyncStorage.getItem(STORAGE_KEY_PLAYLISTS);
      if (playlistsString) {
        setPlaylists(JSON.parse(playlistsString));
      }
    } catch (error) {
      console.error("Error loading playlists: ", error);
    }
  };

  const savePlaylists = async (playlists) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_PLAYLISTS,
        JSON.stringify(playlists)
      );
    } catch (error) {
      console.error("Error saving playlists: ", error);
    }
  };

  const addPlaylist = async (name) => {
    if (!name) {
      Alert.alert("Error", "Playlist name cannot be empty.");
      return;
    }
    const newPlaylist = { id: new Date().toISOString(), name, songs: [] };
    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    await savePlaylists(updatedPlaylists);
  };

  const addToPlaylist = async (playlistId, song) => {
    const updatedPlaylists = playlists.map((pl) =>
      pl.id === playlistId ? { ...pl, songs: [...pl.songs, song] } : pl
    );
    setPlaylists(updatedPlaylists);
    await savePlaylists(updatedPlaylists);
  };

  const editPlaylist = async (id, newName) => {
    if (!newName) {
      Alert.alert("Error", "Playlist name cannot be empty.");
      return;
    }
    const updatedPlaylists = playlists.map((pl) =>
      pl.id === id ? { ...pl, name: newName } : pl
    );
    setPlaylists(updatedPlaylists);
    await savePlaylists(updatedPlaylists);
  };

  const deletePlaylist = async (id) => {
    const updatedPlaylists = playlists.filter((pl) => pl.id !== id);
    setPlaylists(updatedPlaylists);
    await savePlaylists(updatedPlaylists);
  };

  const loadBlockedSongs = async () => {
    try {
      const blockedSongsString = await AsyncStorage.getItem(
        STORAGE_KEY_BLOCKED_SONGS
      );
      if (blockedSongsString) {
        setBlockedSongs(JSON.parse(blockedSongsString));
      }
    } catch (error) {
      console.error("Error loading blocked songs: ", error);
    }
  };

  const saveBlockedSongs = async (blockedSongs) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_BLOCKED_SONGS,
        JSON.stringify(blockedSongs)
      );
    } catch (error) {
      console.error("Error saving blocked songs: ", error);
    }
  };

  const addToBlockedSongs = async (song) => {
    const updatedBlockedSongs = [...blockedSongs, song];
    setBlockedSongs(updatedBlockedSongs);
    await saveBlockedSongs(updatedBlockedSongs);
  };

  useEffect(() => {
    getPermission();
    loadPlaylists();
    loadBlockedSongs();
    loadQueue();
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioFiles,
        playlists,
        blockedSongs,
        queue,
        addPlaylist,
        addToPlaylist,
        editPlaylist,
        deletePlaylist,
        addToBlockedSongs,
        addToQueue,
        setAudioFiles,
        removeFromQueue,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
