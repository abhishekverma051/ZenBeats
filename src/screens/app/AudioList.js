import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../../components/SearchBar";
import color from "../../miscs/color";
import { useNavigation } from "@react-navigation/native";
import OptionModal from "../../components/OptionModal";



const { width } = Dimensions.get("window");

const AudioList = () => {
  const { audioFiles, setAudioFiles, addToQueue } = useContext(AudioContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = React.useState(false);

  const navigation = useNavigation();

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

  const handlePlay = (item) => {
    navigation.navigate("Player", {
      audioUri: item.uri,
      filename: item.filename,
      audioId: item.id,
    });
  };

  const handleAddToPlaylist = () => {
    if (selectedItem) {
      setModalVisible(false);
      navigation.navigate("PlaylistScreen", { song: selectedItem });
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      setAudioFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== selectedItem.id)
      );
      setSelectedItem(null);
    }
  };

  const handleAddToQueue = async () => {
    if (selectedItem) {
      await addToQueue(selectedItem);
      Alert.alert("Success", "Song added to queue!");
      setModalVisible(false);
    }
  };

  const filteredAudioFiles = audioFiles.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => handlePlay(item)}>
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
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <LinearGradient colors={color.LG} style={styles.linearGradient}>
      <View style={styles.topHead}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
        onAddToPlaylist={handleAddToPlaylist}
        onDelete={handleDelete}
        onAddToQueue={handleAddToQueue}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("QueueScreen")}
        style={styles.queueButton}
      >
        <Entypo name="folder-music" size={28} color="#FFD700" />
         
      </TouchableOpacity>

      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
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
  filename: {
    fontSize: 16,
    fontWeight: "bold",
  },
  duration: {
    fontSize: 14,
    color: "#777",
  },
  threeDots: {
    padding: 10,
  },
  topHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginTop:25
  },
  searchContainer: {
    flex: 1,
  },
  queueButton: {
    position: "absolute",
    bottom: 30,
    right: 15,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 50,
    height:80,
    width:80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent:"center"

  },
  queueButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color:"white"
  },
  linearGradient: {
    flex: 1,
  },
});

export default AudioList;
