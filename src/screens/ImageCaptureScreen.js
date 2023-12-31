import { useState } from "react";
import { StyleSheet, Text,  View,} from "react-native";

import ImageCapture from "../components/ImageComponent/ImageCapture";
import ImagePreview from "../components/ImageComponent/ImagePreview";

const ImageCaptureScreen = ({ navigation }) => {
  
  const [photoData, setPhotoData] = useState(); 

  const imageCaptureSceen =  (
      <View style={styles.container}>
        <ImageCapture setPhotoData={setPhotoData}/>
      </View>  
    )

  const imagePreviewScreen =  (
    <View style={styles.container}>
      <ImagePreview photoData= {photoData} setPhotoData={setPhotoData}/>
    </View>  
  )

  if(!photoData)    
    return imageCaptureSceen
  else
    return imagePreviewScreen

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 2
  },
});

export default ImageCaptureScreen;
