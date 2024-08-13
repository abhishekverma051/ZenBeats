import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation, useRoute } from "@react-navigation/native";
import PlayerOptionModal from "../../components/PlayerOptionModal";
import Slider from "@react-native-community/slider";
const { width } = Dimensions.get("window");

const Player = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { audioUri, filename } = route.params || {};

  

  useEffect(() => {
    if (!audioUri) {
      console.error("No audioUri provided");
      return;
    }

    const loadAudio = async () => {
      try {
        const { sound: loadedSound, status } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: isPlaying }
        );
        setSound(loadedSound);
        setPlaybackDuration(status.durationMillis);

        loadedSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            if (status.isPlaying) {
              setPlaybackPosition(status.positionMillis);
            }
          }
        });

        return () => {
          if (loadedSound) {
            loadedSound.unloadAsync();
          }
        };
      } catch (error) {
        console.error("Error loading audio: ", error);
      }
    };

    loadAudio();
  }, [audioUri]);

  useEffect(() => {
    const playPauseAudio = async () => {
      if (sound) {
        if (isPlaying) {
          await sound.playAsync();
        } else {
          await sound.pauseAsync();
        }
      }
    };

    playPauseAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [isPlaying, sound]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPlaybackPosition(value);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <LinearGradient colors={color.LG} style={styles.container}>
      <TouchableOpacity
        style={styles.iconBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-sharp" size={34} color="white" />
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Now Playing
      </Text>
      <TouchableOpacity
        style={styles.iconDots}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="dots-three-vertical" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.content}>
        <FontAwesome6 name="music" size={200} color="white" />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{filename}</Text>
        </View>
        <View style={styles.controls}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={playbackDuration}
            value={playbackPosition}
            onValueChange={handleSeek}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#fff"
          />
          <View style={styles.duration}>
            <Text style={styles.time}>{formatTime(playbackPosition)}</Text>
            <Text style={styles.time}>{formatTime(playbackDuration)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.playPauseButton}>
              <MaterialIcons name="skip-previous" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.playPauseButton}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton}>
              <MaterialIcons name="skip-next" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PlayerOptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconBack: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  iconDots: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleContainer: {
    marginVertical: 20,  
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  controls: {
    width: "100%",
    alignItems: "center",
  },
  playPauseButton: {
    marginHorizontal: 20,
  },
  slider: {
    width: width - 40,
    height: 40,
     
  },
  time: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default Player;
