import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles";
import axios from "axios";

import {
  ScrollView,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  return (
    <ScrollView>
      <View>
        {/* Logo */}
        <View style={styles.containerLogoAirbnbSignup}>
          <Image
            style={styles.logoAirbnb}
            source={require("../assets/airbnb.png")}
          />
          <Text style={styles.textSignin}>Sign up</Text>
        </View>

        {/* input email & password */}
        <KeyboardAwareScrollView style={styles.containerForm}>
          <TextInput
            style={styles.inputSignin}
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputSignin}
            placeholder="username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            autoCapitalize="none"
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.inputSigninDescription}
            placeholder="Describe yourself in a few words..."
            onChangeText={(text) => setDescription(text)}
            value={description}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputSignin}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputSignin}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            defaultValue={confirmPassword}
          />
        </KeyboardAwareScrollView>

        {/* message d'erreur qui apparaît en cas de pépin */}
        {<Text style={styles.error}>{errorMessage}</Text>}

        {/* bouton SignIn */}
        <View style={styles.containerButton}>
          <View style={styles.buttonSignup}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  setErrorMessage("");

                  if (
                    !email ||
                    !username ||
                    !description ||
                    !password ||
                    !confirmPassword
                  ) {
                    setErrorMessage("remplir tous les champs");
                    return;
                  }

                  if (password !== confirmPassword) {
                    setErrorMessage("Les mots de passe ne sont pas identiques");
                    return;
                  }

                  const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/sign_up",
                    {
                      email,
                      username,
                      description,
                      password,
                    }
                  );

                  const userToken = response.data.token;
                  setToken(userToken);
                  // console.log(userToken);
                  alert("Vous êtes connecté");
                } catch (error) {
                  console.log(error.response.data.error);

                  const message = error.response.data.error;

                  if (
                    message === "This email already has an account." ||
                    message === "This username already has an account."
                  ) {
                    setErrorMessage(message);
                  }
                }
              }}
            >
              <Text style={styles.textButtonSignin}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.account}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.textAccount}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
