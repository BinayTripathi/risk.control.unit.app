import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import UserTracker from "./UserTracker";
import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <UserTracker displayCoordinates={false}/>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('ImageCaptureScreen')
        }> 
            <AntDesign name="camerao" size={28} color="green" /> Photo 
      </Button>

      
      
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" , params: { lastState: 'Logout' }}],
          })
        } >
        <AntDesign name="logout" size={24} color="green" /> Logout
      </Button>

    </Background>
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
