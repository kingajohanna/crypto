import React from "react";
import { Alert } from "react-native";
import { deleteAccount, logOut } from "@services/FirebaseServices";

export const DeleteAlert = () => {
    return Alert.prompt(
        "Account delete",
        `Are you sure you wish to delete your account?
Please enter 'DELETE' in the editbox`,
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "OK",
                onPress: (text) => {
                    if (text === "DELETE") deleteAccount();
                },
            },
        ],
        "plain-text",
    );
};

export const LogoutAlert = () => {
    return Alert.prompt(
        "Logout",
        `Click OK to logout!`,
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => logOut(),
            },
        ],
        "default",
    );
};

export const ReLogin = () => {
    Alert.prompt(
        "",
        `This operation is sensitive and requires recent authentication. 
Log in again before retrying this request.`,
        [
            {
                text: "OK",
                onPress: () => logOut(),
            },
        ],
        "default",
    );
};
