import { AccountBottomModal } from "@components/AccountBottomModal";
import { AccountButton } from "@components/AccountButton";
import { TextInput } from "@components/InputField";
import { isFulfilled } from "@reduxjs/toolkit";
import { googleSignIn, login, signup } from "@services/FirebaseServices";
import { Colors, hexToRGBA } from "@theme/Colors";
import { getModalHeight } from "@utils/BottomModalHeight";
import React, { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

export const UserNotLoggedIn = () => {
    const signUp = useRef() as React.MutableRefObject<RBSheet>;
    const logIn = useRef() as React.MutableRefObject<RBSheet>;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [signInError, setSignInError] = useState("");

    const resetStates = () => {
        setEmail("");
        setPassword("");
        setPasswordConf("");
        setSignInError("");
    };

    const onLogin = () => {
        const err = login(email, password);
        if (err) handleFirebaseActions(err.toString());
    };

    const onSignUp = () => {
        const err = signup(email, password, passwordConf);
        if (err) handleFirebaseActions(err.toString());
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
        <>
            <AccountButton.Google onPress={() => googleSignIn()} />
            <AccountButton.EmailLogIn onPress={() => logIn.current!.open()} />
            <AccountButton.EmailSignIn onPress={() => signUp.current!.open()} />
            <RBSheet ref={signUp} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={getModalHeight(0.45)} customStyles={modalStyle}>
                <AccountBottomModal
                    errorText={signInError}
                    primaryButtonText="Register"
                    primaryButtonOnPress={() => onSignUp()}
                    secondaryButtonText="Cancel"
                    secondaryButtonOnPress={() => closeModal()}
                >
                    <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                    <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} />
                    <TextInput placeholder="Confirm password" title="Password" onChangeText={setPasswordConf} value={passwordConf} />
                </AccountBottomModal>
            </RBSheet>
            <RBSheet ref={logIn} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={getModalHeight(0.37)} customStyles={modalStyle}>
                <AccountBottomModal errorText={signInError} primaryButtonText="Login" primaryButtonOnPress={() => onLogin()} secondaryButtonText="Cancel" secondaryButtonOnPress={() => closeModal()}>
                    <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                    <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} />
                </AccountBottomModal>
            </RBSheet>
        </>
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
