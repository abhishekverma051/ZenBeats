import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import Entypo from "@expo/vector-icons/Entypo";
import OptionModal from "../../components/OptionModal";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../../components/SearchBar";
import color from "../../miscs/color";

const { width } = Dimensions.get("window");

const AudioList = () => {
  const { audioFiles } = useContext(AudioContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleThreeDotsPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const filteredAudioFiles = audioFiles.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.container}>
          <View style={styles.item}>
            <Image style={styles.image} source={{ uri: defaultImage }} />
            <View style={styles.detail}>
              <Text style={styles.filename}>{item.filename}</Text>
              <Text style={styles.duration}>
                {formatDuration(item.duration)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.threeDots}
              onPress={() => handleThreeDotsPress(item)}
            >
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient colors={color.LG} style={styles.linearGradient}>
      <View style={styles.topHead}>
        <TouchableOpacity>
          <Entypo name="list" size={44} color="white" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        </View>
      </View>

      <FlatList
        data={filteredAudioFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <OptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedItem}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C7DBE6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 5,
    backgroundColor: "#C7DBE6",
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
  topHead: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  searchContainer: {
    flex: 1,
    marginLeft: 15,
  },
});

export default AudioList;
