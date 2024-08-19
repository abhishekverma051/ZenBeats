import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
  Alert,
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
import Feather from "@expo/vector-icons/Feather";
import { AudioContext } from "../../context/AudioProvider";

const img = require("../../assets/images/album.png");
const { width } = Dimensions.get("window");

const Player = () => {
  const { audioFiles, setAudioFiles } = useContext(AudioContext);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favourite, setFavourite] = useState(false);
  const [sleepTimerDuration, setSleepTimerDuration] = useState(15);
  const [sleepTimerVisible, setSleepTimerVisible] = useState(false);
    const { queue, removeFromQueue } = useContext(AudioContext);


  const navigation = useNavigation();
  const route = useRoute();
  const { audioUri, filename, audioId } = route.params || {};
  const sleepTimerRef = useRef(null);

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

  useEffect(() => {
    const handlePlaybackStatusUpdate = (status) => {
      if (status.isLoaded) {
        if (status.didJustFinish) {
          if (repeat) {
            sound.setPositionAsync(0);
            sound.playAsync();
          } else {
            setIsPlaying(false);
            if (shuffle) {
              handlePlayNext();
            }
          }
        }
        if (status.isPlaying) {
          setPlaybackPosition(status.positionMillis);
        }
      }
    };

    if (sound) {
      sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    }

    return () => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate(null);
      }
    };
  }, [repeat, sound, shuffle]);

  const shuffleArray = (array) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handlePlayPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const previousTrack = audioFiles[currentIndex - 1];
      navigation.navigate("Player", {
        audioUri: previousTrack.uri,
        filename: previousTrack.filename,
        audioId: previousTrack.id,
      });
      setCurrentIndex(currentIndex - 1);
    } else {
      console.log("No previous track available");
    }
  }, [currentIndex, audioFiles, navigation]);

  const handlePlayNext = useCallback(() => {
    if (shuffle) {
      const shuffledFiles = shuffleArray(audioFiles);
      const nextIndex = shuffledFiles.findIndex((file) => file.id === audioId);
      if (nextIndex > -1) {
        const nextTrack = shuffledFiles[nextIndex + 1] || shuffledFiles[0];
        navigation.navigate("Player", {
          audioUri: nextTrack.uri,
          filename: nextTrack.filename,
          audioId: nextTrack.id,
        });
        setCurrentIndex(nextIndex);
      }
    } else {
      if (currentIndex < audioFiles.length - 1) {
        const nextTrack = audioFiles[currentIndex + 1];
        navigation.navigate("Player", {
          audioUri: nextTrack.uri,
          filename: nextTrack.filename,
          audioId: nextTrack.id,
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        console.log("No next track available");
      }
    }
  }, [currentIndex, audioFiles, navigation, shuffle, audioId]);

  const handleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPlaybackPosition(value);
    }
  };

  const handleSleepTimerPress = () => {
    setModalVisible(false);
    setSleepTimerVisible(true);
  };

  const handleSleepTimer = (duration) => {
    setModalVisible(false);
    setSleepTimerDuration(duration);
    if (sleepTimerRef.current) {
      clearTimeout(sleepTimerRef.current);
    }
    sleepTimerRef.current = setTimeout(() => {
      if (sound) {
        sound.pauseAsync();
        setIsPlaying(false);
      }
    }, duration * 60 * 1000);
  };

  const handleRingtoneEditorPress = () => {
    console.log("edit");
    setModalVisible(false);
  };

  const handleBlockSongPress = () => {
    console.log("Block Song Pressed");
    setModalVisible(false);

    setAudioFiles(audioFiles.filter((file) => file.id !== audioId));
    handlePlayNext();
  };

  const handleSharePress = async () => {
    console.log("Share Pressed");
    setModalVisible(false);

    try {
      await Share.share({
        message: `Check out this song: ${filename}`,
        url: audioUri,
        title: filename,
      });
    } catch (error) {
      console.error("Error sharing the song: ", error);
    }
  };

  const handleRemoveFromQueuePress = () => {
    console.log("Remove from Queue Pressed");
    setModalVisible(false);
    setAudioFiles(audioFiles.filter((file, index) => index !== currentIndex));
    handlePlayNext();
  };

  const handleFavoritePress = () => {
    navigation.navigate("FavoriteSongs");
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleRemoveFromQueue = (item) => {
    removeFromQueue(item);
  };

  return (
    <LinearGradient colors={color.LG} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-sharp" size={34} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity
          style={styles.iconDots}
          onPress={() => setModalVisible(true)}
        >
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={img} style={styles.img} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{filename}</Text>
          <TouchableOpacity onPress={handleFavoritePress}>
            <MaterialIcons
              name={favourite ? "favorite" : "favorite-border"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => setRepeat((prev) => !prev)}
              style={styles.playPauseButton}
            >
              <MaterialIcons
                name={repeat ? "repeat-one" : "repeat"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handlePlayPrevious}
            >
              <MaterialIcons name="skip-previous" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.playPauseButton}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={39}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handlePlayNext}
            >
              <MaterialIcons name="skip-next" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handleShuffle}
            >
              <MaterialIcons
                name={shuffle ? "shuffle-on" : "shuffle"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PlayerOptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSleepTimerPress={handleSleepTimerPress}
        onRingtoneEditorPress={handleRingtoneEditorPress}
        onBlockSongPress={handleBlockSongPress}
        onSharePress={handleSharePress}
        onRemoveFromQueuePress={handleRemoveFromQueuePress}
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
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,  
    marginTop:25
  },
  iconBack: {
    marginLeft: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  iconDots: {
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleContainer: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
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
  img: {
    width: 300,
    height: 310,
  },
});

export default Player;