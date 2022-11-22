import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [errorMessageBis, setErrorMessageBis] = useState();

  return (
    <ScrollView>
      <View>
        <View style={styles.containerLogoAirbnb}>
          <Image
            style={styles.logoAirbnb}
            source={require("../assets/airbnb.png")}
          />
          <Text style={styles.textSignin}>Sign in</Text>
        </View>
        <KeyboardAwareScrollView>
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
        {<Text style={styles.error}>{errorMessage}</Text>}

        <View style={styles.buttonSignin}>
          <TouchableOpacity
            title="Sign in"
            onPress={async () => {
              try {
                const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/log_in",
                  {
                    email,
                    password,
                  }
                );

                // if (error.response?.status === 200) {
                //   alert(`Vous êtes connecté`);
                // }
              } catch (error) {
                console.log(error.message);

                if (error.response?.status === 401) {
                  setErrorMessage("Email ou mot de passe invalide");
                }
                if (error.response?.status === 400) {
                  setErrorMessage("Veuillez remplir tous les champs");
                }
              }
              // console.log(response.data.token);

              const userToken = response.data.token;
              setToken(userToken);
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerLogoAirbnb: {
    // borderColor: "red",
    // borderWidth: 0.8,
    alignItems: "center",
    marginVertical: 100,
  },

  // page Sign Up
  textSignin: {
    color: "#565555",
    fontSize: 25,
    fontWeight: "600",
    marginTop: 40,
  },

  logoAirbnb: {
    width: 100,
    height: 100,
  },

  inputSignin: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginVertical: 15,
  },

  buttonSignin: {
    marginTop: 100,
    marginBottom: 15,
    padding: 15,
    borderRadius: 50,
    borderColor: "red",
    borderWidth: 2,
    marginHorizontal: 125,
  },

  account: {
    color: "#565555",
    alignItems: "center",
  },

  textAccount: {
    color: "#565555",
  },

  textButtonSignin: {
    color: "#565555",
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
  },

  error: {
    textAlign: "center",
    color: "red",
  },
});
