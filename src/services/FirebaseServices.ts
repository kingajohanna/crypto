import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { addUser, removeUser } from "@services/UserServices";
import { loginAction, logoutAction } from "@stores/Actions";
import { ReLogin } from "@components/Alert";

GoogleSignin.configure({
    webClientId: "846343653708-2vjl1i736qqn5lgfqia80g2ieqsm3ktj.apps.googleusercontent.com",
});

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
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user = auth().signInWithCredential(googleCredential);

    user.then((re) => {
        loginAction(re.user.uid, re.additionalUserInfo?.profile?.email, re.user.metadata.creationTime!, re.user.displayName!, re.user.photoURL!);
        if (re.additionalUserInfo?.isNewUser) addUser(re.user.uid, re.additionalUserInfo.profile?.email, re.user.metadata.creationTime!, re.user.displayName!, re.user.photoURL!);
    });

    return user;
}

export async function signup(email: string, password: string, handleModal: (arg0?: string) => void) {
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
