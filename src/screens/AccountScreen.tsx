import React, { useRef, useState } from "react";
import { Dimensions, Platform } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";

import { RootState } from "@stores/store";
import { Tabs } from "@constants/Tabs";
import { AccountButton } from "@components/AccountButton";
import { ScreenBackground } from "@components/ScreenBackground";
import { TextInput } from "@components/InputField";

import { Colors, hexToRGBA } from "@theme/Colors";

import { AccountBottomModal } from "@components/AccountBottomModal";
import { googleSignIn, login, logOut, signup } from "@services/FirebaseServices";
import { DeleteAlert, LogoutAlert } from "@components/Alert";
import { NAVBARHEIGHT } from "@constants/androidHelper";
import Dialog from "react-native-dialog";

const { height: SIZE } = Dimensions.get("window");

export const AccountScreen = () => {
    const user = useSelector((state: RootState) => state.user, shallowEqual);

    const signUp = useRef() as React.MutableRefObject<RBSheet>;
    const logIn = useRef() as React.MutableRefObject<RBSheet>;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [signInError, setSignInError] = useState("");

    const [logoutPopup, setLogoutPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

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
        else {
            closeModal();
            console.log(user.toString());
        }
    };

    return (
        <ScreenBackground title={Tabs.account}>
            {!user.isLoggedIn && (
                <>
                    <AccountButton.Google onPress={() => googleSignIn()} />
                    <AccountButton.EmailLogIn onPress={() => logIn.current!.open()} />
                    <AccountButton.EmailSignIn onPress={() => signUp.current!.open()} />
                    <RBSheet
                        ref={signUp}
                        closeOnPressMask={true}
                        onClose={() => resetStates()}
                        closeDuration={180}
                        openDuration={180}
                        height={Platform.OS === "ios" ? SIZE * 0.35 : SIZE * 0.45 + NAVBARHEIGHT}
                        customStyles={modalStyle}
                    >
                        <AccountBottomModal
                            errorText={signInError}
                            primaryButtonText="Register"
                            primaryButtonOnPress={() => signup(email, password, passwordConf, handleFirebaseActions)}
                            secondaryButtonText="Cancel"
                            secondaryButtonOnPress={() => closeModal()}
                        >
                            <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                            <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} />
                            <TextInput placeholder="Confirm password" title="Password" onChangeText={setPasswordConf} value={passwordConf} />
                        </AccountBottomModal>
                    </RBSheet>
                    <RBSheet
                        ref={logIn}
                        closeOnPressMask={true}
                        onClose={() => resetStates()}
                        closeDuration={180}
                        openDuration={180}
                        height={Platform.OS === "ios" ? SIZE * 0.33 : SIZE * 0.33 + NAVBARHEIGHT}
                        customStyles={modalStyle}
                    >
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
                    <AccountButton.Logout onPress={() => setLogoutPopup(true)} />
                    <AccountButton.Delete onPress={() => setDeletePopup(true)} />
                    <LogoutAlert visible={logoutPopup} setVisible={setLogoutPopup} />
                    <DeleteAlert visible={deletePopup} setVisible={setDeletePopup} />
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
        backgroundColor: hexToRGBA(Colors.richBlack, 0.5),
    },
    draggableIcon: {
        backgroundColor: Colors.cadetBlue,
    },
};
