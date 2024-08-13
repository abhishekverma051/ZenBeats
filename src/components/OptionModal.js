import React from 'react';
import {
  View,
  Text,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

export default function OptionModal({ visible, onClose, item, onAddToPlaylist ,onDelete}) {
  if (!visible) return null;
  const handleAddToPlaylist = () => {
    if (onAddToPlaylist) {
      onAddToPlaylist();
      onClose();
    }
  };
  const handleDelete = () =>{
    if(onDelete){
      onDelete();
      onClose();
    }
  }

  return (
    <>
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={onClose}>
        <Modal
          animationType='slide'
          transparent
          visible={visible}
          onRequestClose={onClose}
        >
          <View style={styles.overlay}>
            <View style={styles.container}>
              <Text style={styles.title}>{item ? item.filename : 'Title'}</Text>

              <View style={styles.options}>
                <TouchableOpacity style={styles.button} onPress={handleAddToPlaylist}>
                  <Text style={styles.buttonText}>Add to Playlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}  >
                  <Text style={styles.buttonText}>Play Later</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  options: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FAFCF8',
    padding: 15,
    borderRadius: 7,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
