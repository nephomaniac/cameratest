import react, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  Image,
  View,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MenuButton from "./menuButton";

export default function Picker() {
  const [hasGalleryPermission, setHasCameraPermission] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async (img) => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        if (result != null && result.canceled) {
          console.log("Picker user canceled");
        } else if (result.assets[0] == null) {
          console.log("Failed to select image:" + JSON.stringify(result));
          //console.log("launch picker result:" + JSON.stringify(result));
        } else {
          console.log("Picked Image URI:" + result.assets[0].uri);
          if (img === 2) {
            setImage2(result.assets[0].uri);
          } else {
            setImage1(result.assets[0].uri);
          }
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        console.log("Error selecting image:" + err);
      });
  };

  if (hasGalleryPermission == null) {
    return <Text>Waiting for images permission... </Text>;
  } else if (hasGalleryPermission === false) {
    return <Text>No Access To Internal Images (permissions?) </Text>;
  }

  /*
  if (image == null) {
    console.log("Image is null");
    return (
      <Button title="Pick Image" onPress={pickImage} style={styles.button} />
    );
  }
  */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image1 }} style={styles.image} />
        <Text>{image1}</Text>
        <Button
          title="Pick Image 1"
          onPress={() => pickImage(1)}
          style={styles.button}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image2 }} style={styles.image} />
        <Text>{image2}</Text>
        <Button
          title="Pick Image 2"
          onPress={() => pickImage(2)}
          style={styles.button}
        />
      </View>
      <Pressable
        title="Check Images"
        onPress={() =>
          props.navigation.navigate("imageCheck", { data: [image1, image2] })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 30,
    flex: 1,
  },
  checkButton: {
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 10,
    color: "green",
  },
  imageContainer: {
    width: "90%",
    flex: 2,
    borderColor: "blue",
    borderWidth: 4,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    padding: 10,
    width: "80%",
    height: "50%",
  },
});
