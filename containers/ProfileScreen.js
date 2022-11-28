import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles";
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
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  //Demander le droit d'accéder à la galerie
  const permissionGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      //ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      console.log(result);
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setPicture(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const permissionAndTakePicture = async () => {
    //Demander le droit d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();
      // console.log(result);
      setSelectedPicture(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  const sendPicture = async () => {
    setIsLoading(true);

    const tab = picture.split(".");
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: picture,
        name: `my-pic.${tab[1]}`,
        type: `image/${tab[1]}`,
      });
      const response = await axios.post(
        "https://upload-file-server-with-js.herokuapp.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          //Si vous avez des headers à transmettre c'est par ici !
          //headers: { Authorization: "Bearer " + userToken },
          //transformRequest: (formData) => formData,
        }
      );

      if (response.data) {
        setIsLoading(false);
        alert("Photo Envoyée !");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // console.log("userId =>", userId);
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      setUserName(response.data.username);
      setEmail(response.data.email);
      setIsLoading(false);
      setDescription(response.data.description);
      if (response.data.photo) {
        setPicture(response.data.photo.url);
      }
    } catch (error) {
      console.log("catch =>", error.response);
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
          {picture && (
            <Image source={{ uri: picture }} style={styles.profilePicture} />
          )}

          <View style={styles.pictos}>
            <TouchableOpacity onPress={permissionGetPicture}>
              <MaterialIcons name="photo-library" size={24} color="#717171" />
            </TouchableOpacity>
            <TouchableOpacity onPress={permissionAndTakePicture}>
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
