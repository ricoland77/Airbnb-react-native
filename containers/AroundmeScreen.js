import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import * as Location from "expo-location";
import styles from "../styles";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";
import { TouchableOpacity } from "react-native-web";

export default function App() {
  const navigation = useNavigation();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);
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
      } catch (error) {
        console.log(error.message);
      }
    };

    getPermission();
    fetchData();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <ActivityIndicator style={styles.activity} />
  ) : (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.869374,
          longitude: 2.361323,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {data.map((marker) => {
          return (
            <Marker
              onCalloutPress={() =>
                navigation.navigate("Room", { userId: marker._id })
              }
              key={marker.location[0]}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
      </MapView>
    </View>
  );
}

// const { params } = useRoute();
