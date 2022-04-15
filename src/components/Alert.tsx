import React, { useState } from "react";
import Dialog from "react-native-dialog";
import { deleteAccount, logOut } from "@services/FirebaseServices";
import { Alert, View } from "react-native";

type AlertProps = {
    visible: boolean;
    setVisible: (arg0: boolean) => void;
};

export const DeleteAlert: React.FC<AlertProps> = ({ visible, setVisible }) => {
    const [text, setText] = useState("");
    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Account delete</Dialog.Title>
                <Dialog.Description>Do you want to delete this account? Please enter 'DELETE' in the editbox.</Dialog.Description>
                <Dialog.Input onChangeText={(text) => setText(text)} value={text} />
                <Dialog.Button
                    label="Cancel"
                    onPress={() => {
                        setText("");
                        setVisible(false);
                    }}
                />
                <Dialog.Button
                    label="Delete"
                    onPress={() => {
                        if (text === "DELETE") {
                            deleteAccount();
                            setVisible(false);
                        }
                    }}
                />
            </Dialog.Container>
        </View>
    );
};

export const LogoutAlert: React.FC<AlertProps> = ({ visible, setVisible }) => {
    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Logout</Dialog.Title>
                <Dialog.Description>Click OK to logout!</Dialog.Description>
                <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
                <Dialog.Button
                    label="OK"
                    onPress={() => {
                        logOut();
                        setVisible(false);
                    }}
                />
            </Dialog.Container>
        </View>
    );
};

export const ReLogin = () => {
    Alert.alert(
        "",
        `This operation is sensitive and requires recent authentication. 
Log in again before retrying this request.`,
        [
            {
                text: "OK",
                onPress: () => logOut(),
            },
        ],
    );
};
