import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
 
const img = require("../../assets/images/sigma.png");
 const AboutPage = () => {
 const navigation = useNavigation()
  return (
    <LinearGradient colors={color.LG} style={styles.lg}>
      <Ionicons
        name="arrow-back-sharp"
        size={34}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={img} style={styles.logo} />
        <Text style={styles.title}>About ZenBeats</Text>
        <Text style={styles.description}>
          ZenBeats is a music app.
          It provides a seamless experience for browsing and playing audio files
          with a modern and intuitive interface. The app allows users to view a
          list of audio files, play selected tracks, and manage their playback.
        </Text>

        <Text style={styles.sectionTitle}>Developer</Text>
        <Text style={styles.developer}>Abhishek Verma</Text>

        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://facebook.com/weatherapp")}
          >
            <Text style={styles.link}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://twitter.com/weatherapp")}
          >
            <Text style={styles.link}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://instagram.com/weatherapp")}
          >
            <Text style={styles.link}>Instagram</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.contact}>support@weatherapp.com</Text>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    lg:{
        flex:1,
        paddingTop:52
    },
  container: {
    flexGrow: 1,
     marginTop:6,
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "white",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 24,
    color: "white",
    fontWeight:"semibold"
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "white",
  },
  developer: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    color: "white",
  },
  link: {
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "underline",
  },
  contact: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  version: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    color: "yellow",
  },
  button:{
    marginTop:14,
    marginLeft:12
  }
});

export default AboutPage;
