import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Modal,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
const { width } = Dimensions.get("window");

export default function PlayerOptionModal({ visible, onClose }) {
  return (
    <>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Player Options</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons
                      style={styles.icon}
                      name="bell-sleep"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.buttonText}>Sleep Timer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons
                      name="music-clef-treble"
                      size={24}
                      color="orange"
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>Ringtone Editor</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Entypo
                      name="share"
                      size={24}
                      color="blue"
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <FontAwesome
                      name="remove"
                      size={24}
                      color="red"
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>Remove from Queue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
     
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  buttons: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    gap: 100,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
});
