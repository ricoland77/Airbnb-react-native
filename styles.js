import { Dimensions } from "react-native";

export default {
  // page Sign Up
  containerLogoAirbnb: {
    // borderColor: "red",
    // borderWidth: 0.8,
    alignItems: "center",
    marginVertical: 100,
  },

  containerLogoAirbnbSignup: {
    alignItems: "center",
    marginVertical: 30,
  },

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

  inputSigninDescription: {
    padding: 5,
    height: 80,
    textAlignVertical: "top",
    borderColor: "red",
    borderWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginVertical: 15,
  },

  buttonSignin: {
    borderColor: "red",
    borderWidth: 2,
    marginTop: 100,
    marginBottom: 15,
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 125,
  },

  buttonSignup: {
    borderColor: "red",
    borderWidth: 2,
    marginTop: 60,
    marginBottom: 15,
    padding: 15,
    borderRadius: 50,
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

  // page Home
  homeImage: {
    width: "100%",
    height: 200,
  },

  homeLogo: {
    alignItems: "center",
    marginVertical: 15,
  },

  logoAirbnbHome: {
    width: 30,
    height: 30,
    alignItems: "center",
  },

  offerHome: {
    // borderWidth: 2,
    // borderColor: "red",
    margin: 10,
    paddingVertical: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: "#d3d3d3",
  },

  homePrice: {
    textAlign: "center",
    fontSize: 20,
    width: "25%",
    color: "white",
    backgroundColor: "black",
    padding: 15,
    position: "absolute",
    top: 155,
  },

  homeTitle: {
    width: "85%",
    fontSize: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
  },

  titleAvatar: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "end",
  },

  homeStars: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  homeReview: {
    marginHorizontal: 5,
    color: "#afafaf",
    fontSize: 12,
  },

  activity: {
    flex: 1,
  },

  // page ROOM
  offerRoom: {
    margin: 10,
  },

  roomPrice: {
    textAlign: "center",
    fontSize: 20,
    width: "25%",
    color: "white",
    backgroundColor: "black",
    padding: 15,
    position: "absolute",
    top: 135,
  },

  // page Around me
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  wrapper: {
    height: 200,
  },
  slide: {
    height: 200,
  },

  // page Profile
  profilePicture: {
    marginTop: 20,
    borderWidth: 0.7,
    borderColor: "red",
    width: 150,
    height: 150,
    borderRadius: "100%",
  },

  allPict: {
    alignItems: "center",
  },

  pictos: {
    // borderColor: "green",
    // borderWidth: 0.7,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 90,
    marginTop: 10,
  },

  inputProfileDescription: {
    borderColor: "red",
    borderWidth: 1,
    padding: 5,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginVertical: 30,
    height: 100,
  },

  borderUpdate: {
    // borderColor: "green",
    // borderWidth: 1,
    alignItems: "center",
  },

  updateProfile: {
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    width: 155,
    padding: 11,
    borderRadius: 30,
    marginVertical: 10,
  },

  LogOutProfile: {
    backgroundColor: "#d6d6d6",
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    width: 155,
    padding: 11,
    borderRadius: 30,
    marginVertical: 10,
  },

  textBtn: {
    fontSize: 15,
    color: "#717171",
  },

  // page Setting
  btnSetting: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};
