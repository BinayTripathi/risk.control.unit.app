import React from 'react'
import {StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StartScreen,
  LoginScreen,
  ImageCaptureScreen,
  VideoLocation,
  Dashboard,
  UserTracker,
  VideoRecorder,
  LocationMap
} from './src/screens'


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: true,
          }}>              
              <Stack.Screen name="Home" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
              <Stack.Screen name="Dashboard" component={Dashboard} />             
              <Stack.Screen name="ImageCaptureScreen" component={ImageCaptureScreen} />
           </Stack.Navigator>
      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
