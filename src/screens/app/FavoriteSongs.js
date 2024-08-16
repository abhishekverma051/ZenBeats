 import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";
import Ionicons from "@expo/vector-icons/Ionicons";

const FavoriteSongs = () => {
  const { playlists } = useContext(AudioContext);
  const navigation = useNavigation();

  const favoriteSongs = playlists.flatMap((playlist) => playlist.songs);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Player", {
          audioUri: item.uri,
          filename: item.filename,
          audioId: item.id,
        })
      }
    >
      <View style={styles.item}>
        <Text style={styles.title}>{item.filename}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={color.LG} style={styles.lg}>
      <Ionicons
        name="arrow-back-sharp"
        size={34}
        color="white"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <Text style={styles.header}>Favorite Songs</Text>
        <FlatList
          data={favoriteSongs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
  },lg:{
    flex:1,
    paddingTop:18,
    paddingLeft:12
  }
});

export default FavoriteSongs ;
