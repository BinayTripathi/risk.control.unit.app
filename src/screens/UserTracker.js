import { useEffect , useState} from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import {
    getLastKnownPositionAsync,
    getCurrentPositionAsync,
    requestForegroundPermissionsAsync,
    PermissionStatus,
  } from 'expo-location';
import { AntDesign } from '@expo/vector-icons';

const generateDateTime = () => {
    const date = new Date();
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${day} - ${month} - ${year} ${hours}:${min}:${sec}`;
  }

function UserTracker({displayCoordinates}) {

    //GPS
    const [gps, setGps] = useState(null);  
    const [dateTime, setDateTime] = useState('')



  useEffect(()=> {
    async function getUserLocation() {
        let locationPermissionInformation = await requestForegroundPermissionsAsync();
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
          const permissionResponse = await requestPermission();
          console.log('Permission granted')         
        }
    
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
          Alert.alert(
            'Insufficient Permissions!',
            'You need to grant location permissions to use this app.'
          );   
         return false
        }

        let location = await getLastKnownPositionAsync({});
        if (!gps) {
          setGps(location.coords);
        }
    
        let currentLocation = await getCurrentPositionAsync({});
    
        if (gps && currentLocation.coords.latitude !== gps.latitude) {
          setGps(currentLocation.coords);
        }

        setDateTime(generateDateTime())
       
      }
      getUserLocation()
  },[])

   useEffect( () => {
    if(dateTime && gps) {
        console.log(`Date Time : ${dateTime}`)
        console.log(`Location : ${gps.latitude} / ${gps.longitude}`)
    }
    
  }, [dateTime,gps])
  
  const displayCoordintes = displayCoordinates? (
    <View style={styles.gps}>
      {gps  ? (
        <View>
          <Text style={styles.prevBtnText}>Date Time : {dateTime} </Text>
           <Text style={styles.prevBtnText}>Location : {gps.latitude} / {gps.longitude} </Text>
        </View>
      ) : (
        <View>
          <Text>Waiting...</Text>
        </View>
      )}      
    </View>
  ) : null;
 

  return displayCoordintes;
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    
    color: "green",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor:"#000",
  },
  prevBtnText: {
    color: '#120101',
    fontWeight: "700",
    fontSize: 15,
  },
});



export default UserTracker;
