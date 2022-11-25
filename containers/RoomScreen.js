import styles from "../styles";
import { useRoute } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import Swiper from "react-native-swiper";

export default function RoomScreen(route) {
  // console.log(route);
  const { params } = useRoute();

  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.userId}`
      );
      setDetails(response.data);
      setIsLoading(false);
      // console.log("okokokok", details);
    };
    fetchDetails();
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

      <View style={styles.offerRoom}>
        <ScrollView>
          <Swiper
            style={styles.wrapper}
            dotColor="salmon"
            activeDotColor="red"
            autoplay
          >
            {details.photos.map((slide) => {
              return (
                <View style={styles.slide} key={slide.picture_id}>
                  <Image
                    // style={styles.homeImage}
                    source={{ uri: slide.url }}
                    style={{ height: "100%", width: "100%" }}
                  />
                </View>
              );
            })}
          </Swiper>
        </ScrollView>
        <Text style={styles.roomPrice}>{details.price} €</Text>
        <View style={styles.titleAvatar}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.homeTitle}
            >
              {details.title}
            </Text>
            <View style={styles.homeStars}>
              <Text>{generateStarts(details.ratingValue)}</Text>
            </View>
          </View>

          <Image
            style={styles.avatar}
            source={{ uri: details.user.account.photo.url }}
          />
        </View>
        <Text numberOfLines={3} style={styles.roomDescription}>
          {details.description}
        </Text>
      </View>
    </View>
  );
}

/* <Text>user id : {params.userId}</Text> */
