import { NAVBARHEIGHT } from "@utils/androidHelper";
import { Dimensions, Platform } from "react-native";

const { height: SIZE } = Dimensions.get("window");

/**
 * calculate bottom modals height, add paddings, with a given height percentage
 */
export const getModalHeight = (heightPercentage: number) => {
    return Platform.OS === "ios" ? SIZE * heightPercentage : SIZE * heightPercentage + (NAVBARHEIGHT || 20);
};
