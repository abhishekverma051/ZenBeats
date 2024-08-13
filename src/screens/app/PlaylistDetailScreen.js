import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";

const { width } = Dimensions.get("window");

const PlaylistDetailScreen = ({ route }) => {
  const { playlists } = useContext(AudioContext);
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = route.params;

  useEffect(() => {
    const selectedPlaylist = playlists.find((pl) => pl.id === playlistId);
    setPlaylist(selectedPlaylist);
  }, [playlists, playlistId]);

  if (!playlist) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={color.LG} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>{playlist.name}</Text>
        <FlatList
          data={playlist.songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
              <Text style={styles.songTitle}>Taswer.mp3</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.songItem}>
              <Text style={styles.songTitle}>Taswer.mp3</Text>
            </View>
          }
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  songItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  songTitle: {
    fontSize: 18,
    color: "#fff",
  },
  emptyList: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PlaylistDetailScreen;
