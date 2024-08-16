 import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import color from "../../miscs/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const PlaylistScreen = () => {
  const {
    playlists,
    addPlaylist,
    editPlaylist,
    deletePlaylist,
    addToPlaylist,
  } = useContext(AudioContext);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [editingPlaylist, setEditingPlaylist] = useState(null); 
  const [editName, setEditName] = useState("");  
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.song) {
      setSelectedSong(route.params.song);
    }
  }, [route.params]);

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim()) {
      await addPlaylist(newPlaylistName);
      setNewPlaylistName("");
      Alert.alert("Success", `Playlist '${newPlaylistName}' created.`);
    } else {
      Alert.alert("Error", "Please enter a name for the new playlist");
    }
  };

  const handleEditPlaylist = async () => {
    if (editName.trim()) {
      await editPlaylist(editingPlaylist.id, editName);
      setEditingPlaylist(null);
      setEditName("");
      Alert.alert("Success", "Playlist name updated.");
    } else {
      Alert.alert("Error", "Please enter a new name for the playlist.");
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this playlist?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deletePlaylist(playlistId);
          },
        },
      ]
    );
  };

  const handleAddToPlaylist = async () => {
    if (selectedPlaylist && selectedSong) {
      await addToPlaylist(selectedPlaylist.id, selectedSong);
      setSelectedPlaylist(null);
      Alert.alert("Success", "Song added to the playlist.");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Please select a playlist.");
    }
  };

  const handlePlaylistPress = (playlistId) => {
    navigation.navigate("PlaylistDetailScreen", { playlistId });
  };

  const renderPlaylistItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <TouchableOpacity onPress={() => handlePlaylistPress(item.id)}>
        <Text style={styles.playlistName}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setEditingPlaylist(item);
          setEditName(item.name);
        }}
      >
        <Ionicons name="create" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeletePlaylist(item.id)}>
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={color.LG} style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={34} color="white" />
        </TouchableOpacity>

        {editingPlaylist ? (
          <View style={styles.editContainer}>
            <Text style={styles.header}>Edit Playlist Name</Text>
            <TextInput
              style={styles.input}
              placeholder="New playlist name"
              value={editName}
              onChangeText={setEditName}
            />
            <TouchableOpacity
              style={styles.button1}
              onPress={handleEditPlaylist}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button1, { backgroundColor: "#FF0000" }]}  
              onPress={() => setEditingPlaylist(null)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.header}>Create Playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="New playlist name"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />
            <TouchableOpacity
              style={styles.button1}
              onPress={handleCreatePlaylist}
            >
              <Text style={styles.buttonText}>Create Playlist</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.header}>Existing Playlists</Text>
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaylistItem}
        />

        <Text style={styles.header}>Add Song to Playlist</Text>
        {selectedSong ? (
          <View>
            <Text style={styles.songDetails}>Selected Song:</Text>
            <Text style={styles.songDetails}>
              Filename: {selectedSong.filename}
            </Text>
            <Text style={styles.songDetails}>
              Duration: {selectedSong.duration} seconds
            </Text>
          </View>
        ) : (
          <Text style={styles.songDetails}>No song selected</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleAddToPlaylist}>
          <Text style={styles.buttonText}>Add to Selected Playlist</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  innerContainer: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  button1: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: "#1DB954",
    width: "60%",
    alignSelf: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  playlistItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  playlistName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#1DB954",
  },
  songDetails: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  editContainer: {
    marginBottom: 20,
  },
});

export default PlaylistScreen;
