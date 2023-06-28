import { useEffect , useState} from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import {
    getLastKnownPositionAsync,
    getCurrentPositionAsync,
    requestForegroundPermissionsAsync,
    PermissionStatus,
  } from 'expo-location';

  import {getMapPreview} from '../../util/getMapPreview'

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
        <View style={styles.mapPreview}>          
           <Image
            style={styles.image}
            source={{
              uri: getMapPreview(gps.latitude, gps.longitude),
            }}
          />
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
   mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aaa7a7',
    borderRadius: 4,
    overflow: 'hidden',
    elevation: 4,
    borderRadius: 10
  },
  image: {
    width: '100%',
    height: '100%',
  },
  
});



export default UserTracker;
