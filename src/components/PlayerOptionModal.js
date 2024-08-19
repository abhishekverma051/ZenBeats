import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

const PlayerOptionModal = ({
  visible,
  onClose,
  onSleepTimerPress,
  onRingtoneEditorPress,
  onBlockSongPress,
  onSharePress,
  onRemoveFromQueuePress,
}) => {
  const [timerInput, setTimerInput] = useState("");
  const [sleepTimerModalVisible, setSleepTimerModalVisible] = useState(false);

  const handleSleepTimerButtonPress = () => {
    setSleepTimerModalVisible(true);
  };

  const handleSetSleepTimer = () => {
    const duration = parseInt(timerInput, 10);
    if (isNaN(duration) || duration <= 0) {
      Alert.alert(
        "Invalid Duration",
        "Please enter a valid duration in minutes."
      );
      return;
    }
    onSleepTimerPress(duration);
    setTimerInput("");
    setSleepTimerModalVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleSleepTimerButtonPress}
          >
            <MaterialCommunityIcons
              name="power-sleep"
              size={24}
              color="black"
            />
            <Text style={styles.optionText}>Sleep Timer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={onRingtoneEditorPress}
          >
            <AntDesign name="edit" size={24} color="black" />
            <Text style={styles.optionText}>Edit Ringtone</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={onBlockSongPress}
          >
            <MaterialIcons name="block" size={24} color="black" />
            <Text style={styles.optionText}>Block Song</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={onSharePress}>
            <Entypo name="share" size={24} color="blue" />
            <Text style={styles.optionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={onRemoveFromQueuePress}
          >
            <FontAwesome name="remove" size={24} color="red" />
            <Text style={styles.optionText}>Remove from Queue</Text>
          </TouchableOpacity>

          
          <Modal
            visible={sleepTimerModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.sleepTimerModalContainer}>
              <View style={styles.sleepTimerModalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Set Sleep Timer (minutes)"
                  keyboardType="numeric"
                  value={timerInput}
                  onChangeText={setTimerInput}
                />
                <TouchableOpacity
                  style={styles.setButton}
                  onPress={handleSetSleepTimer}
                >
                  <Text style={styles.setButtonText}>Set Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setSleepTimerModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  optionButton: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginBottom: 19,
    borderRadius: 12,
    marginBottom: 2,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    marginTop: 15,
  },
  optionText: {
    fontSize: 18,
  },
  sleepTimerModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sleepTimerModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "80%",
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  setButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  setButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default PlayerOptionModal;
