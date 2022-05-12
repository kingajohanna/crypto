import React from "react";
import { Tabs } from "@constants/Tabs";
import { ScreenBackground } from "@components/ScreenBackground";
import { UserLoggedIn } from "@screens/MyCoinsScreen/UserLoggedIn";
import { UserNotLoggedIn } from "@screens/MyCoinsScreen/UserNotLoggedIn";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";

/**
 * render the correct screen based on the user's status (logged in or not)
 */
export const MyCoinsScreen = () => {
    const user = useSelector((state: RootState) => state.user, shallowEqual);
    return (
        <ScreenBackground title={Tabs.mycoins}>
            {!user.isLoggedIn && <UserNotLoggedIn />}
            {user.isLoggedIn && <UserLoggedIn />}
        </ScreenBackground>
    );
};
