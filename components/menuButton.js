import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const MenuButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => props.navigation.navigate(props.navTarget)}
    >
      <Text style={styles.menuButtonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    flexDirection: "row",
    color: "gold",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: "#daa520",
    textShadowColor: "goldenrod",
    textShadowOffset: 20,
    textShadowRadius: 5,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000c0",
  },
  menuButtonText: {
    color: "gold",
    fontSize: 50,
    lineHeight: 55,

    textShadowColor: "goldenrod",
    textShadowRadius: 10,
    fontWeight: "bold",
  },
  menuButtonImage: {
    margin: 20,
    width: 50,
    height: 50,
  },
});
export default MenuButton;
