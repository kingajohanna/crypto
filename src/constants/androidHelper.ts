import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
export const NAVBARHEIGHT = screenHeight - windowHeight;
