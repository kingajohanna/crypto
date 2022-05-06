import { authError } from "@constants/authError";
import { login, passwordReset, signup } from "@services/FirebaseServices";
import { setAuthErrorAction } from "@actions/ErrorActions";
import { firebaseEmail, firebasePassword } from "@utils/regex";

export const onSignUpValidationAndSignup = async (email: string, password: string, passwordConf: string, onClose?: Function) => {
    setAuthErrorAction("");
    if (!password || !passwordConf || !email) {
        setAuthErrorAction(authError.missingData);
        console.log("1");
    } else if (password !== passwordConf) {
        setAuthErrorAction(authError.passwordsMatch);
    } else if (!password.match(firebasePassword)) {
        setAuthErrorAction(authError.invalidPassword);
    } else if (!email.match(firebaseEmail)) {
        setAuthErrorAction(authError.invalidEmail);
    } else {
        return await signup(email, password, passwordConf);
    }
    return false;
};

export const onLoginValidationAndLogin = async (email: string, password: string) => {
    setAuthErrorAction("");
    if (!password || !email) {
        setAuthErrorAction(authError.missingData);
    } else if (!password.match(firebasePassword)) {
        setAuthErrorAction(authError.invalidPassword);
    } else if (!email.match(firebaseEmail)) {
        setAuthErrorAction(authError.invalidEmail);
    } else {
        return await login(email, password);
    }
    return false;
};

export const onPasswordResetValidationAndReset = async (email: string) => {
    setAuthErrorAction("");
    if (!email) {
        setAuthErrorAction(authError.missingEmail);
    } else {
        return await passwordReset(email);
    }
    return false;
};
