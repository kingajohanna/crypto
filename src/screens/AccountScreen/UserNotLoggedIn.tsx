import React, { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { shallowEqual, useSelector } from "react-redux";
import { AccountBottomModal } from "@components/AccountBottomModal";
import { AccountButton } from "@components/AccountButton";
import { TextInput } from "@components/InputField";
import { googleSignIn } from "@services/FirebaseServices";
import { Colors, hexToRGBA } from "@theme/Colors";
import { getModalHeight } from "@utils/BottomModalHeight";
import { setAuthErrorAction } from "@actions/ErrorActions";
import { RootState } from "@stores/store";
import { Text } from "@components/Text";
import { onLoginValidationAndLogin, onPasswordResetValidationAndReset, onSignUpValidationAndSignup } from "@utils/validation";

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

    const closeModal = () => {
        logIn.current?.close();
        signUp.current?.close();
        resetStates();
    };

    const onSignUp = async () => {
        const success = await onSignUpValidationAndSignup(email, password, passwordConf);
        if (success) closeModal();
    };

    const onLogin = async () => {
        const success = await onLoginValidationAndLogin(email, password);
        if (success) closeModal();
    };

    const onPasswordReset = async () => {
        await onPasswordResetValidationAndReset(email);
    };

    const onLoginPress = () => {
        logIn.current!.open();
    };

    const onSignUpPress = () => {
        signUp.current!.open();
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
