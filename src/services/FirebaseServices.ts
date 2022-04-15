import auth, { firebase } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { initializeApp } from "firebase/app";
import { addUser, removeUser } from "@services/UserServices";
import { loginAction, logoutAction } from "@stores/Actions";
import { ReLogin } from "@components/Alert";

export async function login(email: string, password: string, handleModal: (arg0?: string) => void) {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            loginAction(res.user.uid, res.user.email!, res.user.metadata.creationTime!);
            handleModal();
        })
        .catch(async (error) => {
            handleModal(error.toString().split("] ", 2)[1]);
        });
}

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
        if (error.code === "SIGN_IN_CANCELLED") {
            // user cancelled the login flow
            console.log("User cancelled the login flow");
        } else if (error.code === "IN_PROGRESS") {
            // operation (e.g. sign in) is in progress already
            console.log("Peration (e.g. sign in) is in progress already: ", error.toString());
        } else if (error.code === "PLAY_SERVICES_NOT_AVAILABLE") {
            // play services not available or outdated
            console.log("Play services not available or outdated");
        } else {
            // some other error happened
            console.log("Some other error happened: ", error.toString());
        }
    }
    return null;
}

export async function signup(email: string, password: string, passwordConf: string, handleModal: (arg0?: string) => void) {
    if (password === passwordConf)
        return auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = auth().currentUser!;
                addUser(user.uid, user.email!, user.metadata.creationTime);
                loginAction(user.uid, user.email!, user.metadata.creationTime!);
                handleModal();
            })
            .catch((error) => {
                handleModal(error.toString().split("] ", 2)[1]);
            });
}

export async function logOut() {
    return auth()
        .signOut()
        .then(() => logoutAction())
        .catch((error) => {
            console.error(error);
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
                    console.error(error.code);
            }
        });
}
