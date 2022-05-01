import React, { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { shallowEqual, useSelector } from "react-redux";
import { AccountBottomModal } from "@components/AccountBottomModal";
import { AccountButton } from "@components/AccountButton";
import { TextInput } from "@components/InputField";
import { authError } from "@constants/authError";
import { googleSignIn, login, passwordReset, signup } from "@services/FirebaseServices";
import { Colors, hexToRGBA } from "@theme/Colors";
import { getModalHeight } from "@utils/BottomModalHeight";
import { firebaseEmail, firebasePassword } from "@utils/regex";
import { setAuthErrorAction } from "@stores/Actions";
import { RootState } from "@stores/store";
import { Text } from "@components/Text";

/*
    login and register screen
*/
export const UserNotLoggedIn = () => {
    const signUp = useRef() as React.MutableRefObject<RBSheet>;
    const logIn = useRef() as React.MutableRefObject<RBSheet>;
    const error = useSelector((state: RootState) => state.error.authError, shallowEqual);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    const resetStates = () => {
        setEmail("");
        setPassword("");
        setPasswordConf("");
        setAuthErrorAction("");
    };

    const onLogin = () => {
        setAuthErrorAction("");
        if (!password || !email) {
            setAuthErrorAction(authError.missingData);
        } else if (!password.match(firebasePassword)) {
            setAuthErrorAction(authError.invalidPassword);
        } else if (!email.match(firebaseEmail)) {
            setAuthErrorAction(authError.invalidEmail);
        } else {
            login(email, password);
            if (!error) closeModal();
        }
    };

    const onSignUp = () => {
        setAuthErrorAction("");
        if (!password || !passwordConf || !email) {
            setAuthErrorAction(authError.missingData);
        } else if (password !== passwordConf) {
            setAuthErrorAction(authError.passwordsMatch);
        } else if (!password.match(firebasePassword)) {
            setAuthErrorAction(authError.invalidPassword);
        } else if (!email.match(firebaseEmail)) {
            setAuthErrorAction(authError.invalidEmail);
        } else {
            signup(email, password, passwordConf);
            if (!error) closeModal();
        }
    };

    const onPasswordReset = () => {
        setAuthErrorAction("");
        if (!email) {
            setAuthErrorAction(authError.missingEmail);
        } else {
            passwordReset(email);
        }
    };

    const onLoginPress = () => {
        logIn.current!.open();
    };

    const onSignUpPress = () => {
        signUp.current!.open();
    };

    const closeModal = () => {
        logIn.current?.close();
        signUp.current?.close();
        resetStates();
    };

    return (
        <>
            <AccountButton.Google onPress={() => googleSignIn()} />
            <AccountButton.EmailLogIn onPress={() => onLoginPress()} />
            <AccountButton.EmailSignIn onPress={() => onSignUpPress()} />
            <RBSheet ref={signUp} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={getModalHeight(0.47)} customStyles={modalStyle}>
                <AccountBottomModal errorText={error} primaryButtonText="Register" primaryButtonOnPress={() => onSignUp()} secondaryButtonText="Cancel" secondaryButtonOnPress={() => closeModal()}>
                    <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                    <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} isSecret />
                    <TextInput placeholder="Confirm password" title="Password" onChangeText={setPasswordConf} value={passwordConf} isSecret />
                </AccountBottomModal>
            </RBSheet>
            <RBSheet ref={logIn} closeOnPressMask={true} onClose={() => resetStates()} closeDuration={180} openDuration={180} height={getModalHeight(0.4)} customStyles={modalStyle}>
                <AccountBottomModal errorText={error} primaryButtonText="Login" primaryButtonOnPress={() => onLogin()} secondaryButtonText="Cancel" secondaryButtonOnPress={() => closeModal()}>
                    <TextInput placeholder="Email address" title="Email" onChangeText={setEmail} value={email} />
                    <TextInput placeholder="Password" title="Password" onChangeText={setPassword} value={password} isSecret />
                    <Text onPress={() => onPasswordReset()}>Forgot password</Text>
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
