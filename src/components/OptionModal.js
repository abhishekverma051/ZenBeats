import { View, Text ,Modal,StatusBar,StyleSheet} from 'react-native'
import React from 'react'

export default function OptionModal({visible}) {
  return (
    <>
      <StatusBar hidden />
      <Modal transparent visible={visible}>
        <View style={styles.container}>
          <Text style={styles.title}>title of the song</Text>
          <View style={styles.text}>
            <Text style={styles.text1}>Play Later</Text>
            <Text style={styles.text1}>Add to Playlist</Text>
            <Text style={styles.text1}>Delete</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    borderTopRightRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 7,
    padding: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    justifyContent: "center",
  },
  text: {
    marginTop: 14,
  },
  text1: {
    fontSize: 18,
    margin: 12,
  },
});