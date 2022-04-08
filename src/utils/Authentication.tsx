import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { addUser } from "@services/UserServices";

GoogleSignin.configure({
    webClientId: "846343653708-2vjl1i736qqn5lgfqia80g2ieqsm3ktj.apps.googleusercontent.com",
});

export async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user = auth().signInWithCredential(googleCredential);

    user.then((re) => {
        if (re.additionalUserInfo?.isNewUser) addUser(re.user.uid, re.user.email!, re.user.displayName!, re.user.metadata.creationTime!);
    });

    return user;
}

export async function signInEmail(email: string, password: string) {
    return auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = auth().currentUser!;
            addUser(user.uid, user.email!, user.metadata.creationTime);
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                console.log("That email address is already in use!");
            }

            if (error.code === "auth/invalid-email") {
                console.log("That email address is invalid!");
            }

            console.error(error);
        });
}

export async function logInEmail(email: string, password: string) {
    return auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            const user = res.user;
            console.log(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

export async function logOut() {
    return auth()
        .signOut()
        .then(() => console.log("User signed out!"))
        .catch((error) => {
            console.error(error);
        });
}
