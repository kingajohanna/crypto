import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { addUser, removeUser } from "@services/UserServices";
import { loginAction, logoutAction } from "@stores/actions/UserActions";
import { setAuthErrorAction } from "@actions/ErrorActions";
import { PasswordReset, ReLogin } from "@components/Alert";
import { errorToMessage } from "@utils/errorUtil";

/**
 *   handle google social login in frebase auth and on the backend
 */
export async function googleSignIn() {
    try {
        const data = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
        const user = auth().signInWithCredential(googleCredential);

        user.then((re) => {
            loginAction(re.user.uid, re.additionalUserInfo?.profile?.email, re.user.metadata.creationTime!, re.user.displayName!, re.user.photoURL!);
            if (re.additionalUserInfo?.isNewUser) addUser(re.user.uid, re.additionalUserInfo.profile?.email, re.user.metadata.creationTime!, re.user.displayName!, re.user.photoURL!);
        });
        console.log("[google signin] " + "[success]");
        return user;
    } catch (error: any) {
        console.log("[google signin] " + error.message);
    }
    return null;
}

/**
 * handle login in firebase auth and in redux
 */
export async function login(email: string, password: string) {
    setAuthErrorAction("");
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            loginAction(res.user.uid, res.user.email!, res.user.metadata.creationTime!);
            console.log("[login] " + "[success]");
            return true;
        })
        .catch(async (error) => {
            console.log("[login] " + errorToMessage(error));
            setAuthErrorAction(errorToMessage(error));
            return false;
        });
}

/**
 * handle register/signup in firebase auth, in redux and on the backend
 */
export async function signup(email: string, password: string) {
    setAuthErrorAction("");
    return auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = auth().currentUser!;
            addUser(user.uid, user.email!, user.metadata.creationTime);
            loginAction(user.uid, user.email!, user.metadata.creationTime!);
            console.log("[signup] " + "[success]");
            return true;
        })
        .catch((error) => {
            console.log("[signup] " + errorToMessage(error));
            setAuthErrorAction(errorToMessage(error));
            return false;
        });
}

/**
 * request password reset from firebase auth
 */
export async function passwordReset(email: string) {
    setAuthErrorAction("");
    return auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            PasswordReset();
            console.log("[password reset] " + "[success]");
            return true;
        })
        .catch((error) => {
            setAuthErrorAction(errorToMessage(error));
            return false;
        });
}

/**
 * handle logout in firebase auth and in redux
 */
export async function logOut() {
    return auth()
        .signOut()
        .then(() => {
            logoutAction();
            console.log("[logout] " + "[success]");
        })
        .catch((error: any) => {
            console.log("[Logout] " + error.message);
        });
}

/**
 * handle login in firebase auth, in redux and on the backend
 */
export async function deleteAccount() {
    const user = auth().currentUser;
    return auth()
        .currentUser?.delete()
        .then(() => {
            removeUser(user!.uid);
            logoutAction();
            console.log("[account delete] " + "[success]");
        })
        .catch(async (error) => {
            switch (error.code) {
                case "auth/requires-recent-login":
                    logoutAction();
                    ReLogin();
                    break;
                default:
                    console.log("[Delete account] " + error.code);
            }
        });
}
