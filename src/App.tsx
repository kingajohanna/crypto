import "react-native-gesture-handler";
import React from "react";
import { BottomNavigator } from "@navigation/BottomNavigator";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEBAPICLIENT } from "@constants/server";

const App = () => {
    GoogleSignin.configure({
        webClientId: WEBAPICLIENT,
    });
    return <BottomNavigator />;
};

export default App;
