import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";
import { FlatList } from "react-native-gesture-handler";

const defaultImage =
  "https://c8.alamy.com/comp/DBR4FJ/dj-headphones-random-music-notes-splash-illustration-vector-file-layered-DBR4FJ.jpg";
export default function Player() {
  const playlists = [
    {
      id: "1",
      title: "Chill Vibes",
      image: "https://via.placeholder.com/100",
    },
    { id: "2", title: "Top Hits", image: "https://via.placeholder.com/100" },
  ];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.playlistContainer}
        onPress={() => navigation.navigate("PlaylistDetail")}
      >
        <Image style={styles.playlistImage} source={{ uri: defaultImage }} />
        <Text style={styles.playlistTitle}>{item.title} </Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={color.LG} style={styles.linearGradient}>
      <FlatList data={playlists} renderItem={renderItem} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
  playlistContainer: {
    marginLeft: 13,
    marginTop: 15,
    width: 150,
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
