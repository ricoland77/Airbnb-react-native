import styles from "../styles";
import { Button, Text, View, TouchableOpacity } from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <View style={styles.btnSetting}>
      <TouchableOpacity
        style={styles.LogOutProfile}
        onPress={() => {
          setToken(null);
        }}
      >
        <View style={styles.borderUpdate}>
          <Text style={styles.textBtn}>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
