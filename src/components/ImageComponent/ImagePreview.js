import React, {  useRef,  } from "react";
import { StyleSheet,Text,TouchableOpacity, View, Image, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

import UserTracker from "./UserTracker";


/*const moveAttachment = async (filePath, newFilepath) => {
  return new Promise((resolve, reject) => {
    RNFS.mkdir(dirPicutures)
      .then(() => {
        RNFS.moveFile(filePath, newFilepath)
          .then(() => {
            console.log('FILE MOVED', filePath, newFilepath);
            resolve(true);
          })
          .catch(error => {
            console.log('moveFile error', error);
            reject(error);
          });
      }) 
      .catch(err => {
        console.log('mkdir error', err);
        reject(err);
      });
  });
};

const saveImage = async filePath => {
      try {
        // set new image name and filepath
        const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
        const newFilepath = `${dirPicutures}/${newImageName}`;
        // move and save image to new filepath
        const imageMoved = await moveAttachment(filePath, newFilepath);
        console.log('image moved', imageMoved);
      } catch (error) {
        console.log(error);
      }
    };*/

const ImagePreview = ({photoData, setPhotoData }) => {
  
    const navigation = useNavigation();
    let savedPhoto = useRef(null);
    //console.log("Image Preview" + photoData)
    const savePhoto = async () => {
        const photo = await captureRef(savedPhoto, {
        result: "tmpfile",
        height: 1980, // these can be adjusted to fit the photo size you like
        width: 1180, // these can be adjusted to fit the photo size you like
        quality: 0.7,
        format: "jpg",
        });   

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      MediaLibrary.createAssetAsync(photo);
      Alert.alert(  
        'Photo Saved',  
        'Photo Saved at so and so location',  
        [  
            {  
                text: 'Ok',  
                onPress: () => {
                  setPhotoData();
                  navigation.navigate('Dashboard')
                },  
                style: 'default',  
            }  
        ]  
    );  
      
    }   
  };
 
  return (
    <View style={styles.container}>
      
      <View style={styles.middlePhoto} ref={savedPhoto}>
        <Image source={{ uri: photoData.uri }} style={{ flex: 1, borderRadius: 10 }} />
        <UserTracker displayCoordinates={true}/>
      </View>

      <View style={[styles.bottomPrev]}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => setPhotoData(null)}
        >
          <Text style={styles.prevBtnText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.prevBtn, { marginLeft: 25 }]}
          onPress={savePhoto}
        >
          <Text style={styles.prevBtnText}>Save Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middlePhoto: {
    flex: 1,
    position: "relative",
  },
  bottomPrev: {
    height: 100,
    backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "row",
  },
  prevBtn: {
    height: 65,
    width: 105,
    backgroundColor: "#4a4a4a",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    marginTop: 20,
    elevation: 4
  },
  prevBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default ImagePreview;
