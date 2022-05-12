import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { Tabs } from "@constants/Tabs";
import { ScreenBackground } from "@components/ScreenBackground";
import { UserLoggedIn } from "@screens/AccountScreen/UserLoggedIn";
import { UserNotLoggedIn } from "@screens/AccountScreen/UserNotLoggedIn";

/**
 * render the correct screen based on the user's status (logged in or not)
 */
export const AccountScreen = () => {
    const user = useSelector((state: RootState) => state.user, shallowEqual);

    return (
        <ScreenBackground title={Tabs.account}>
            {!user.isLoggedIn && <UserNotLoggedIn />}
            {user.isLoggedIn && <UserLoggedIn />}
        </ScreenBackground>
    );
};
