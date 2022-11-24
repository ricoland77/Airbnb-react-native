import { useNavigation } from "@react-navigation/core";
import styles from "../styles";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchRooms();
  }, []);

  const generateStarts = (ratingValue) => {
    const startArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        startArray.push(<Entypo name="star" size={20} color="#FFB000" />);
      } else {
        startArray.push(<Entypo name="star" size={20} color="gray" />);
      }
    }
    return startArray;
    // console.log("OkOKOKOKOk....=>", startArray);
  };

  return isLoading ? (
    <ActivityIndicator style={styles.activity} />
  ) : (
    <View>
      <View style={styles.homeLogo}>
        <Image
          style={styles.logoAirbnbHome}
          source={require("../assets/airbnb.png")}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // console.log("okbis... =>", item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { userId: item._id });
              }}
            >
              <View style={styles.offerHome}>
                <Image
                  style={styles.homeImage}
                  source={{ uri: item.photos[0].url }}
                />
                <Text style={styles.homePrice}>{item.price} €</Text>
                <View style={styles.titleAvatar}>
                  <View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.homeTitle}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.homeStars}>
                      <Text>{generateStarts(item.ratingValue)}</Text>
                    </View>
                  </View>

                  <Image
                    style={styles.avatar}
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      >
        <Text>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
