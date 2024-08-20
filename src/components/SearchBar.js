import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import color from "../miscs/color";

const SearchBar = ({ query, onQueryChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={onQueryChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(240, 240, 240, 0.8)",
  },
});

export default SearchBar;
