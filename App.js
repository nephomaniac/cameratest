import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Picker from "./components/picker.js";
import CamScreen from "./components/camera.js";
import HomeScreen from "./components/home.js";
import ImageCheck from "./components/imageCheck.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stacks = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stacks.Navigator>
        <Stacks.Screen name="Home" component={HomeScreen} />
        <Stacks.Screen name="camera" component={CamScreen} />
        <Stacks.Screen name="picker" component={Picker} />
        <Stacks.Screen name="imageCheck" component={ImageCheck} />
      </Stacks.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
