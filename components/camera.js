import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
//import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const CamScreen = (props) => {
  let cameraRef = useRef();
  let picOptions = {
    quality: 1,
    base64: true,
    exif: false,
  };
  // Check if options are not null and not undefined...
  if (props.picOptions == null) {
    picOptions = { ...picOptions, ...props.picOptions };
  }
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    try {
      let newPhoto = await cameraRef.current.takePictureAsync(picOptions);
      setPhoto(newPhoto);
    } catch (error) {
      console.error("Error taking photo:", error);
      alert("Error taking photo:" + error);
    }
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri)
        .then(() => {
          setPhoto(undefined);
        })
        .catch((err) => {
          Alert.alert("Error sharing photo!", err);
        });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri)
        .then((result) => {
          console.log(JSON.stringify(result, null, 2));
          setPhoto(undefined);
        })
        .catch((err) => {
          Alert.alert("Error saving photo!", err);
        });
    };

    let discardPhoto = () => {
      setPhoto(undefined);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={styles.choiceContainer}>
          <TouchableOpacity style={styles.button} onPress={sharePic}>
            <Ionicons
              name="share-social"
              size={40}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity style={styles.button} onPress={savePhoto}>
              <Ionicons
                name="save"
                size={40}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : undefined}
          <TouchableOpacity style={styles.button} onPress={discardPhoto}>
            <Ionicons
              name="trash"
              size={40}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camContainer}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
      >
        <TouchableOpacity onPress={takePic} style={styles.button}>
          <Ionicons name="camera" size={50} color="white" style={styles.icon} />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "midnightblue",
  },
  choiceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "midnightblue",
    flexDirection: "row",
  },
  camContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    paddingBottom: 20,
  },
  button: {
    color: "blue",
    borderColor: "black",
    borderWidth: 0,
    borderRadius: 30,
    borderCurve: "circular",
    padding: 10,
    marginHorizontal: 10,
    width: "20%",
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 15,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  icon: {
    shadowColor: "black",
    shadowOpacity: 15,
    shadowRadius: 15,
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "space-evenly",
    borderWidth: 0,
    borderCurve: "circular",
    opacity: 10,
  },
  preview: {
    alignSelf: "stretch",
    flex: 6,
    borderColor: "midnightblue",
    borderWidth: 4,
    borderRadius: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
});

export default CamScreen;
