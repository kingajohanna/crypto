import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { addUser, removeUser } from "@services/UserServices";
import { loginAction, logoutAction, setErrorAction } from "@stores/Actions";
import { ReLogin } from "@components/Alert";

export async function googleSignIn() {
    try {
        setErrorAction("");
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
    setErrorAction("");
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            loginAction(res.user.uid, res.user.email!, res.user.metadata.creationTime!);
        })
        .catch(async (error) => {
            console.log("[login] " + error.toString().split("] ", 2)[1]);
            return error.toString().split("] ", 2)[1];
        });
}

export async function signup(email: string, password: string, passwordConf: string) {
    setErrorAction("");
    if (password === passwordConf)
        return auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = auth().currentUser!;
                addUser(user.uid, user.email!, user.metadata.creationTime);
                loginAction(user.uid, user.email!, user.metadata.creationTime!);
            })
            .catch((error) => {
                console.log("[signup] " + error.toString().split("] ", 2)[1]);
                return error.toString().split("] ", 2)[1];
            });
}

export async function logOut() {
    setErrorAction("");
    return auth()
        .signOut()
        .then(() => logoutAction())
        .catch((error: any) => {
            console.log("[Logout] " + error.message);
        });
}

export async function deleteAccount() {
    setErrorAction("");
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
