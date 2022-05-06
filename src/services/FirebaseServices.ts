import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { addUser, removeUser } from "@services/UserServices";
import { loginAction, logoutAction } from "@stores/actions/UserActions";
import { setAuthErrorAction } from "@actions/ErrorActions";
import { PasswordReset, ReLogin } from "@components/Alert";

/*
   google sso
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
        return user;
    } catch (error: any) {
        console.log("[google signin] " + error.message);
    }
    return null;
}

export async function login(email: string, password: string) {
    setAuthErrorAction("");
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            loginAction(res.user.uid, res.user.email!, res.user.metadata.creationTime!);
            return true;
        })
        .catch(async (error) => {
            console.log("[login] " + error.toString().split("] ", 2)[1]);
            setAuthErrorAction(error.toString().split("] ", 2)[1]);
            return false;
        });
}

export async function signup(email: string, password: string, passwordConf: string) {
    setAuthErrorAction("");
    if (password === passwordConf)
        return auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = auth().currentUser!;
                addUser(user.uid, user.email!, user.metadata.creationTime);
                loginAction(user.uid, user.email!, user.metadata.creationTime!);
                return true;
            })
            .catch((error) => {
                console.log("[signup] " + error.toString().split("] ", 2)[1]);
                setAuthErrorAction(error.toString().split("] ", 2)[1]);
                return false;
            });
}

export async function passwordReset(email: string) {
    setAuthErrorAction("");
    return auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            PasswordReset();
            return true;
        })
        .catch((error) => {
            setAuthErrorAction(error.toString().split("] ", 2)[1]);
            return false;
        });
}

export async function logOut() {
    return auth()
        .signOut()
        .then(() => logoutAction())
        .catch((error: any) => {
            console.log("[Logout] " + error.message);
        });
}

export async function deleteAccount() {
    const user = auth().currentUser;
    return auth()
        .currentUser?.delete()
        .then(() => {
            removeUser(user!.uid);
            logoutAction();
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
