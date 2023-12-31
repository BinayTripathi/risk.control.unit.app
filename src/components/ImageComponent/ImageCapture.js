import React, { useState, useEffect, useRef } from "react";
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { Camera } from "expo-camera";

import { StyleSheet, TouchableOpacity, View, Alert, } from "react-native";

  
const ImageCapture = ({setPhotoData}) => {

  const [startCamera,setStartCamera] = React.useState(false)
  const [flashMode, setFlashMode] = useState("off");
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [hasPermission, setHasPermission] = useState(null);
  
  useEffect(() => {
    permission();
  }, []);

  const permission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
    setHasPermission(status);
  };


  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };

  const takePhoto = async () => {
    const data = await camera.current.takePictureAsync();
    setPhotoData(data);
  };
  let camera = useRef(null);

  return (
    <View style={styles.container}>
      <Camera style={styles.container} type={type} ref={camera} flashMode={flashMode}>
          
        <View style={styles.top}></View>

        <View style={styles.bottom}>
            
          <TouchableOpacity
              onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
              style={{
                backgroundColor: type === Camera.Constants.Type.back ? "#0f0f0f" : "#f0f0f0",
                color: type === Camera.Constants.Type.back ? "white" : "#fff",
                borderRadius: 70,
                height: 65,
                width: 65,
              }}><View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                {type === Camera.Constants.Type.back
                  ? <AntDesign name="retweet" size={24} color="white" />
                  : <AntDesign name="retweet" size={24} color="black" />
              }
              </View>                 
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <FontAwesome name="camera" style={{ color: "#fff", fontSize: 40}}  />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={__handleFlashMode}
              style={{                  
                borderRadius: 70,
                height: 65,
                width: 65,
              }}
            >
              <View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 1000,  borderColor: "white",borderWidth: 1,}}>
                <Ionicons  name= { flashMode === "off" ? "flash":"flash-off"} style={{ color: "#fff", fontSize: 24}} />
              </View>
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default ImageCapture;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
      flex: 6,
      height: 50,
      backgroundColor: "#3e3c3c",
      opacity: 0.6,
    },
    bottom: {
      flex: 1,
      flexDirection: "row",
      height: 125,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "space-around",
    },
    button: {
      height: 65,
      width: 65,
      borderRadius: 1000,
      borderColor: "white",
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });