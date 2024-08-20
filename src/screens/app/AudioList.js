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
  ImageBackground,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import Entypo from "@expo/vector-icons/Entypo";
import SearchBar from "../../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import OptionModal from "../../components/OptionModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

const img = require("../../assets/images/karan.jpg");
const { width, height } = Dimensions.get("window");

const AudioList = () => {
  const { audioFiles, setAudioFiles, addToQueue } = useContext(AudioContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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
      <View style={styles.itemContainer}>
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={img}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)"]}
            style={styles.gradientOverlay}
          />
          <View style={styles.overlay}>
            <View style={styles.topHead}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Entypo name="list" size={44} color="white" />
              </TouchableOpacity>

              <View style={styles.searchContainer}>
                <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>My Likes and More..</Text>
            </View>
          </View>
        </ImageBackground>

        <TouchableOpacity
          onPress={() => navigation.navigate("QueueScreen")}
          style={styles.queueButton}
        >
          <AntDesign name="play" size={64} color="rgba(240, 240, 240, 0.8)" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredAudioFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.flatList}
      />

      <OptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedItem}
        onAddToPlaylist={handleAddToPlaylist}
        onDelete={handleDelete}
        onAddToQueue={handleAddToQueue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
  },
  backgroundImage: {
    width: width,
    height: height * 0.6,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 15,
  },
  topHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    marginTop: 22,
  },
  searchContainer: {
    flex: 1,
  },
  textContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    zIndex: 2,
  },
  itemContainer: {
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(240, 240, 240, 0.8)",
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
  queueButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    borderRadius: 50,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  flatList: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default AudioList;
