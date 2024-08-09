import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { AudioContext } from "../../context/AudioProvider";
import Entypo from "@expo/vector-icons/Entypo";
import OptionModal from "../../components/OptionModal";

const AudioList = () => {
  const { audioFiles } = useContext(AudioContext);
  const defaultImage =
    "https://c8.alamy.com/comp/DBR4FJ/dj-headphones-random-music-notes-splash-illustration-vector-file-layered-DBR4FJ.jpg";

  const formatDuration = (duration) => {
    if (!duration) {
      return "Unknown";
    } else {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Image style={styles.image} source={{ uri: defaultImage }} />
          <View style={styles.detail}>
            <Text style={styles.filename}>{item.filename}</Text>
            <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
          </View>
          <TouchableOpacity style={styles.threeDots}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <OptionModal visible={true} />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 7,
    padding:12
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  filename: {
    fontWeight: "bold",
  },
  detail: {
    flex: 1,
    paddingRight: 10,
  },
  duration: {
    marginTop: 12,
    fontSize: 12,
  },
  threeDots: {
    marginRight: 12,
  },
});

export default AudioList;
