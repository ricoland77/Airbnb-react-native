import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity } from "react-native";

// Icons
import { Ionicons, AntDesign } from "@expo/vector-icons";

// Containers
import AroundmeScreen from "./containers/AroundmeScreen";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // save or remove token in AsyncStorage & state
  const setToken = async (token) => {
    // console.log(token);
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } else {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    }
  };

  // save or remove id in AsyncStorage & state
  const setId = async (id) => {
    // console.log(id);
    if (id) {
      AsyncStorage.setItem("userId", id);
      setUserId(id);
    } else {
      AsyncStorage.removeItem("userId");
      setUserId(null);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      setUserToken(userToken);
      setUserId(userId);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      {/* Home */}
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "My App",
                          headerStyle: { backgroundColor: "lightskyblue" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      {/* Room */}
                      <Stack.Screen
                        name="Room"
                        options={({ navigation }) => ({
                          title: "My room",
                          headerStyle: { backgroundColor: "lightskyblue" },
                          headerTitleStyle: { color: "white" },
                          headerLeft: () => (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.goBack();
                              }}
                            >
                              <Ionicons
                                name="arrow-back-circle-outline"
                                size={30}
                                color="white"
                              />
                            </TouchableOpacity>
                          ),
                        })}
                        component={RoomScreen}
                      />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabAround"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"location-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Around"
                        options={{
                          title: "Around me",
                          headerStyle: { backgroundColor: "lightgreen" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <AroundmeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={({ navigation }) => ({
                          title: "My room",
                          headerStyle: { backgroundColor: "lightskyblue" },
                          headerTitleStyle: { color: "white" },
                          headerLeft: () => (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.goBack();
                              }}
                            >
                              <Ionicons
                                name="arrow-back-circle-outline"
                                size={30}
                                color="white"
                              />
                            </TouchableOpacity>
                          ),
                        })}
                        component={RoomScreen}
                      />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="ProfileTab"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="user" size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                          headerStyle: { backgroundColor: "lightpink" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {(props) => (
                          <ProfileScreen
                            {...props}
                            userToken={userToken}
                            setToken={setToken}
                            userId={userId}
                            setId={setId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                          headerStyle: { backgroundColor: "red" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
