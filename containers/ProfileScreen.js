import styles from "../styles";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function ProfileScreen({ userToken, setToken, userId, setId }) {
  // const { params } = useRoute();
  // console.log(params);
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  // https://express-airbnb-api.herokuapp.com/user/:id

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      // console.log("ok", response.data);
      setUserName(response.data.username);
      setEmail(response.data.email);
      setIsLoading(false);
      setDescription(response.data.description);
      if (response.data.photo) {
        setPicture(response.data.photo.url);
      }
    } catch (error) {
      console.log("catch =>", error.message);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView>
      <View style={styles.homeLogo}>
        <Image
          style={styles.logoAirbnbHome}
          source={require("../assets/airbnb.png")}
        />
      </View>
      {/* image profile */}
      <ScrollView>
        <View style={styles.allPict}>
          <Image style={styles.profilePicture} />
          <View style={styles.pictos}>
            <TouchableOpacity>
              <MaterialIcons name="photo-library" size={24} color="#717171" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="photo-camera" size={24} color="#717171" />
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.inputSignin}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputSignin}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputProfileDescription}
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => setDescription(text)}
          value={description}
          autoCapitalize="none"
        />
        <View style={styles.allPict}>
          <TouchableOpacity style={styles.updateProfile}>
            <View style={styles.borderUpdate}>
              <Text style={styles.textBtn}>Update</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.LogOutProfile}
            onPress={() => {
              setToken(null);
              setId(null);
            }}
          >
            <View style={styles.borderUpdate}>
              <Text style={styles.textBtn}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
