import React, { useRef, useState } from "react";
import { Text } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import RBSheet from "react-native-raw-bottom-sheet";
import { addUser } from "@services/UserService";

import { Tabs } from "@constants/Tabs";
import { AccountButton } from "@components/AccountButton";
import { ScreenBackground } from "@components/ScreenBackground";
import { TextInput } from "@components/InputField";

import { Colors } from "@theme/Colors";
import { Dimensions, View } from "react-native";
import { Button } from "@components/Button";
import { AccountBottomModal } from "@components/AccountBottomModal";

const { height: SIZE } = Dimensions.get("window");

GoogleSignin.configure({
    webClientId: "846343653708-2vjl1i736qqn5lgfqia80g2ieqsm3ktj.apps.googleusercontent.com",
});

export const AccountScreen = () => {
    const signIn = useRef() as React.MutableRefObject<RBSheet>;
    const logIn = useRef() as React.MutableRefObject<RBSheet>;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [signInError, setSignInError] = useState("");

    const openSignInModal = () => {
        signIn.current!.open();
    };

    const openLogInModal = () => {
        logIn.current!.open();
    };

    const closeModal = () => {
        logIn.current!.close();
        signIn.current!.close();
        resetStates();
    };

    const resetStates = () => {
        setEmail("");
        setPassword("");
        setPasswordConf("");
        setSignInError("");
    };

    async function onGoogleLogin() {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const user = auth().signInWithCredential(googleCredential);

        user.then((re) => {
            if (re.additionalUserInfo?.isNewUser) addUser(re.user.uid, re.user.email!, re.user.displayName!, re.user.metadata.creationTime!);
        });

        return user;
    }

    async function onSignIn() {
        if (password === passwordConf)
            return auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const user = auth().currentUser!;
                    addUser(user.uid, user.email!, user.metadata.creationTime);
                })
                .catch((error) => {
                    setSignInError(error.toString().split("] ", 2)[1]);
                });
        else {
            setSignInError("Passwords not the same");
        }
    }

    async function onLogIn() {
        return auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                const user = res.user;
                console.log(user);
            })
            .catch((error) => {
                setSignInError(error.toString().split("] ", 2)[1]);
            });
    }

    async function logOut() {
        return auth()
            .signOut()
            .then(() => console.log("User signed out!"))
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <ScreenBackground title={Tabs.account}>
            <AccountButton.Google onPress={() => onGoogleLogin()} />
            <AccountButton.EmailLogIn onPress={() => openLogInModal()} />
            <AccountButton.EmailSignIn onPress={() => openSignInModal()} />

            <RBSheet ref={signIn} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={SIZE * 0.5} customStyles={modalStyle}>
                <AccountBottomModal
                    errorText={signInError}
                    primaryButtonText="Register"
                    primaryButtonOnPress={() => onSignIn()}
                    secondaryButtonText="Cancel"
                    secondaryButtonOnPress={() => closeModal()}
                >
                    <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                    <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} />
                    <TextInput placeholder="Confirm password" title="Password" onChangeText={setPasswordConf} value={passwordConf} />
                </AccountBottomModal>
            </RBSheet>
            <RBSheet ref={logIn} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={SIZE * 0.4} customStyles={modalStyle}>
                <AccountBottomModal errorText={signInError} primaryButtonText="Login" primaryButtonOnPress={() => onLogIn()} secondaryButtonText="Cancel" secondaryButtonOnPress={() => closeModal()}>
                    <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                    <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} />
                </AccountBottomModal>
            </RBSheet>
        </ScreenBackground>
    );
};

const modalStyle = {
    container: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.gunmetal,
    },
    wrapper: {
        backgroundColor: "transparent",
    },
    draggableIcon: {
        backgroundColor: Colors.cadetBlue,
    },
};
