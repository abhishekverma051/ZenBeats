import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import en from "../Translations/english.json"
import React from 'react'

export default function TranslationModal({visible,onClose}) {
   if (!visible) return null;  

   return (
     <View style={styles.modalContainer}>
       <TouchableOpacity onPress={onClose}>
         <Text>Close</Text>
       </TouchableOpacity>
                                                                                                                 
     </View>
   );
}

const styles = StyleSheet.create({
    modalContainer:{
        flex:1
    }
})