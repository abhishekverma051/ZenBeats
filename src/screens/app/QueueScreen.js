import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";
import Entypo from "@expo/vector-icons/Entypo";

const defaultImage =
  "https://c8.alamy.com/comp/DBR4FJ/dj-headphones-random-music-notes-splash-illustration-vector-file-layered-DBR4FJ.jpg";

const { width } = Dimensions.get("window");

const QueueScreen = ({ navigation }) => {
  const { queue, removeFromQueue } = useContext(AudioContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePlay = (item) => {
    navigation.navigate("Player", {
      audioUri: item.uri,
      filename: item.filename,
      audioId: item.id,
    });
  };

  const formatDuration = (duration) => {
    if (!duration) {
      return "Unknown";
    } else {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
  };

  const handleRemoveFromQueue = (item) => {
    removeFromQueue(item);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("Item pressed:", item);
          handlePlay(item);
        }}
      >
        <View style={styles.item}>
          <Image style={styles.image} source={{ uri: defaultImage }} />
          <View style={styles.detail}>
            <Text style={styles.filename}>{item.filename}</Text>
            <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFromQueue(item)}
          >
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <LinearGradient colors={color.LG} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-sharp" size={34} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Queue</Text>
      </View>
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop:25
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  filename: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    padding: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  detail: {
    flex: 1,
    marginLeft: 10,
  },
  duration: {
    fontSize: 14,
    color: "#777",
  },
});

export default QueueScreen;
