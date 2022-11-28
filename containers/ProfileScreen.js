import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles";
import { useEffect, useState } from "react";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
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
  const [isPictureModified, setIsPictureModified] = useState(false);
  const [isInfosModified, setIsInfosModified] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(null);

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
      console.log(error);
      setDisplayMessage({
        message: "An error occurred",
        color: "error",
      });
    }
  };

  //Demander le droit d'accéder à la galerie
  const permissionGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      //ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setPicture(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  //Demander le droit d'accéder à l'appareil photo
  const permissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();
      // console.log(result);
      setPicture(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  // requête pour mettre à jour les informations suivantes : email, username et description
  const editInformations = async () => {
    const obj = {};
    obj.email = email;
    obj.username = userName;
    obj.description = description;
    try {
      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update`,
        obj,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      // console.log(response.data.description);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error.repsonse);
    }

    // requête pour mettre à jour la photo de profil
    try {
      const uri = picture;
      const uriParts = uri.split(".");
      const fileType = uriParts[1];

      const formData = new FormData();
      formData.append("photo", {
        uri,
        name: `userPicture`,
        type: `image/${fileType}`,
      });

      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      // console.log(response.data);
      setPicture(response.data.photo.url);
    } catch (error) {
      console.log(error.repsonse);
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
          {picture ? (
            <Image
              source={{ uri: picture }}
              style={styles.profilePicture}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.FontAwesomePicture}>
              <FontAwesome5
                name="user-alt"
                size={100}
                color="#b5b5b5"
                resizeMode="cover"
              />
            </View>
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
          <TouchableOpacity
            style={styles.updateProfile}
            onPress={editInformations}
          >
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
