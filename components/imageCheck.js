import React, { useState } from "react";
//import cv from "react-native-opencv3";
import { SafeAreaView } from "react-native";

function ImageCheck(props) {
  //const [imageUris, setImageUris] = useState([]);
  const imageUris = [];
  if (props.imageUris == null) {
    console.log("Failed to provide imageUris property");
  } else {
    imageUris = props.imageUris;
  }
  if (imageUris.length < 2) {
    return <Text> {imageUris.length}/2 provided. Requires 2 images</Text>;
  }

  const checkIntersection = (image1, image2) => {
    /*
    const image1Mat = cv.imread(image1);
    const image2Mat = cv.imread(image2);
    const result = new cv.Mat();
    cv.matchTemplate(image1Mat, image2Mat, result, cv.TM_CCOEFF);
    const data = result.getDataAsArray();
    const intersection = data[0][0];
    image1Mat.delete();
    image2Mat.delete();
    result.delete();
    return intersection;
	*/
    return "Test, replace with real result";
  };

  const inter = checkIntersection(imageUris[0], imageUris[1]);
  return (
    <SafeAreaView>
      <Text>Images Intersection:{inter}</Text>
    </SafeAreaView>
  );
}

export default ImageCheck;
