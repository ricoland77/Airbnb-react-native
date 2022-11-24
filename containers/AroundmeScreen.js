import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import styles from "../styles";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";
import { SectionList } from "react-native-web";

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPermission = async () => {
      try {
        // Demander la permission d'accéder aux coordonnées de l'appareil
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(result);
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );
        // console.log("coucou =>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPermission();
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator style={styles.activity} />
  ) : (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {/* {data.location.map((marker) => {
          return (
            <Marker
              key={marker.latitude}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          );
        })} */}
      </MapView>
    </View>
  );
}

// const { params } = useRoute();
