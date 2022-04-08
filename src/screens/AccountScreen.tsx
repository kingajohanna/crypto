import React, { useRef, useState } from "react";
import { Alert, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";

import { RootState } from "@stores/store";
import { Tabs } from "@constants/Tabs";
import { AccountButton } from "@components/AccountButton";
import { ScreenBackground } from "@components/ScreenBackground";
import { TextInput } from "@components/InputField";

import { Colors } from "@theme/Colors";

import { AccountBottomModal } from "@components/AccountBottomModal";
import { googleSignIn, login, signup } from "@services/FirebaseServices";
import { DeleteAlert, LogoutAlert } from "@components/Alert";

const { height: SIZE } = Dimensions.get("window");

export const AccountScreen = () => {
    const user = useSelector((state: RootState) => state.user);

    const signUp = useRef() as React.MutableRefObject<RBSheet>;
    const logIn = useRef() as React.MutableRefObject<RBSheet>;

    const [email, setEmail] = useState("A@b.com");
    const [password, setPassword] = useState("Asdfasdf");
    const [passwordConf, setPasswordConf] = useState("");
    const [signInError, setSignInError] = useState("");

    const resetStates = () => {
        setEmail("");
        setPassword("");
        setPasswordConf("");
        setSignInError("");
    };

    const closeModal = () => {
        logIn.current?.close();
        signUp.current?.close();
        resetStates();
    };

    const handleFirebaseActions = (error?: string) => {
        if (error) setSignInError(error);
        else closeModal();
    };

    return (
        <ScreenBackground title={Tabs.account}>
            {!user.isLoggedIn && (
                <>
                    <AccountButton.Google onPress={() => googleSignIn()} />
                    <AccountButton.EmailLogIn onPress={() => logIn.current!.open()} />
                    <AccountButton.EmailSignIn onPress={() => signUp.current!.open()} />
                    <RBSheet ref={signUp} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={SIZE * 0.5} customStyles={modalStyle}>
                        <AccountBottomModal
                            errorText={signInError}
                            primaryButtonText="Register"
                            primaryButtonOnPress={() => signup(email, password, handleFirebaseActions)}
                            secondaryButtonText="Cancel"
                            secondaryButtonOnPress={() => closeModal()}
                        >
                            <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                            <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} />
                            <TextInput placeholder="Confirm password" title="Password" onChangeText={setPasswordConf} value={passwordConf} />
                        </AccountBottomModal>
                    </RBSheet>
                    <RBSheet ref={logIn} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={SIZE * 0.4} customStyles={modalStyle}>
                        <AccountBottomModal
                            errorText={signInError}
                            primaryButtonText="Login"
                            primaryButtonOnPress={() => login(email, password, handleFirebaseActions)}
                            secondaryButtonText="Cancel"
                            secondaryButtonOnPress={() => closeModal()}
                        >
                            <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                            <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} />
                        </AccountBottomModal>
                    </RBSheet>
                </>
            )}
            {user.isLoggedIn && (
                <>
                    <AccountButton.Logout onPress={() => LogoutAlert()} />
                    <AccountButton.Delete onPress={() => DeleteAlert()} />
                </>
            )}
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
