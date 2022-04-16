import { NAVBARHEIGHT } from "@constants/androidHelper";
import { Dimensions, Platform } from "react-native";

const { height: SIZE } = Dimensions.get("window");

export const getModalHeight = (heightPercentage: number) => {
    return Platform.OS === "ios" ? SIZE * heightPercentage : SIZE * heightPercentage + NAVBARHEIGHT;
};
