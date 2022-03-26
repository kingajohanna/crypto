import React from "react";

import { Tabs } from "@constants/Tabs";

import { AccountButton } from "@components/AccountButton";
import { ScreenBackground } from "@components/ScreenBackground";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
    webClientId: "846343653708-2vjl1i736qqn5lgfqia80g2ieqsm3ktj.apps.googleusercontent.com",
});

async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential);

    user.then((re) => {
        console.log(re);
    });

    return user;
}

async function OnEmail() {
    return auth()
        .signInAnonymously()
        .then(() => {
            console.log("User signed in anonymously");
        })
        .catch((error) => {
            if (error.code === "auth/operation-not-allowed") {
                console.log("Enable anonymous in your firebase console.");
            }

            console.error(error);
        });
}

export const AccountScreen = () => {
    return (
        <ScreenBackground title={Tabs.account}>
            <AccountButton.Email onPress={() => OnEmail()} />
            <AccountButton.Apple />
            <AccountButton.Facebook />
            <AccountButton.Google onPress={() => onGoogleButtonPress().then(() => console.log("Signed in with Google!"))} />
            <AccountButton.Logout />
            <AccountButton.Delete />
        </ScreenBackground>
    );
};
