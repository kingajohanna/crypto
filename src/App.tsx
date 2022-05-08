import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { BottomNavigator } from "@navigation/BottomNavigator";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEBAPICLIENT } from "@constants/server";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { fetchData } from "@utils/FetchData";
import { Error } from "@stores/reducers/ErrorReducer";
import { User } from "@stores/reducers/UserReducer";

const App = () => {
    const user: User = useSelector((state: RootState) => state.user, shallowEqual);
    const error: Error = useSelector((state: RootState) => state.error, shallowEqual);

    GoogleSignin.configure({
        webClientId: WEBAPICLIENT,
    });

    const fetch = async () => {
        await fetchData(user);
    };

    if (__DEV__) {
        useEffect(() => {
            if (error.error.length) console.log(error.error);
        }, [error.error]);
    }

    useEffect(() => {
        fetch();
    }, [user.isLoggedIn]);

    return <BottomNavigator />;
};

export default App;
