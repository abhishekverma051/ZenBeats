import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import color from "../../miscs/color";
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation.navigate("Main");
    }, 2000);  
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={color.LG}  style={styles.container}>
      <Image
        source={require("../../assets/images/splashIcon.png")}
        style={styles.img1}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img1: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
