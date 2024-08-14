import {
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../miscs/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
export default function SettingScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [volume, setVolume] = useState(50);
  const navigation = useNavigation()
  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  const restoreDefaults = () => {
    setDarkMode(false);
    setNotificationsEnabled(true);
    setVolume(50);
    alert("Defaults restored.");
  };

  return (
    <LinearGradient colors={color.LG} style={styles.lg}>
      <Ionicons
        name="arrow-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
        style = {styles.button}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Volume</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={setVolume}
          />
        </View>

        <View style={styles.buttonRow}>
          <Button title="Save Settings" onPress={saveSettings} />
          <Button
            title="Restore Defaults"
            onPress={restoreDefaults}
            color="red"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop:35
  },
  lg: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  label: {
    fontSize: 18,
  },
  slider: {
    width: 150,
    height: 40,
  },
  buttonRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button:{
    marginTop:14,
    marginLeft:12
  }
});
