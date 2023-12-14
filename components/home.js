import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import MenuButton from "./menuButton";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      {console.log("loading home screen!")}
      <MenuButton
        navTarget="camera"
        buttonText="Camera"
        navigation={props.navigation}
      />

      <MenuButton
        navTarget="picker"
        buttonText="Image Picker"
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});

export default HomeScreen;
