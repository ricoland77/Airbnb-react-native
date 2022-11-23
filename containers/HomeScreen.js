import { useNavigation } from "@react-navigation/core";
import styles from "../styles";
import axios from "axios";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Welcome home!</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      >
        <Text>Go to Profile</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // console.log("ok... =>", item);
          <FlatList
            data={item}
            keyExtractor={(item) => picture_id}
            renderItem={({ item }) => {
              console.log("REREREok... =>", item);
              return <View></View>;
            }}
          />;
          // console.log("okbis... =>", item);
          return (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
