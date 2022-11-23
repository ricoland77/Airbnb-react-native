import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles";
import axios from "axios";

import { useState } from "react";

import {
  ScrollView,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  return (
    <ScrollView>
      <View>
        {/* Logo */}
        <View style={styles.containerLogoAirbnb}>
          <Image
            style={styles.logoAirbnb}
            source={require("../assets/airbnb.png")}
          />
          <Text style={styles.textSignin}>Sign in</Text>
        </View>

        {/* input email & password */}
        <KeyboardAwareScrollView style={styles.containerForm}>
          <TextInput
            style={styles.inputSignin}
            placeholder="email"
            onChangeText={(newText) => setEmail(newText)}
            defaultValue={email}
          />
          <TextInput
            style={styles.inputSignin}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(newText) => setPassword(newText)}
            defaultValue={password}
          />
        </KeyboardAwareScrollView>

        {/* message d'erreur qui apparaît en cas de pépin */}
        {<Text style={styles.error}>{errorMessage}</Text>}

        {/* bouton SignIn */}
        <View style={styles.containerButton}>
          <View style={styles.buttonSignin}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    {
                      email,
                      password,
                    }
                  );
                  console.log(response.data.token);

                  const userToken = response.data.token;
                  setToken(userToken);
                  alert("Vous êtes connecté");
                } catch (error) {
                  console.log(error.message);

                  if (error.response?.status === 401) {
                    setErrorMessage("Email ou mot de passe invalide");
                  }
                  if (error.response?.status === 400) {
                    setErrorMessage("Veuillez remplir tous les champs");
                  }
                }
              }}
            >
              <Text style={styles.textButtonSignin}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.account}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.textAccount}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
