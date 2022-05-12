import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { Tabs } from "@constants/Tabs";
import { ScreenBackground } from "@components/ScreenBackground";
import { UserNotLoggedIn } from "@screens/FavouritesScreen/UserNotLoggedIn";
import { UserLoggedIn } from "@screens/FavouritesScreen/UserLoggedIn";

/**
 * render the correct screen based on the user's status (logged in or not)
 */
export const FavouriteScreen = () => {
    const user = useSelector((state: RootState) => state.user, shallowEqual);

    return (
        <ScreenBackground title={Tabs.favourites}>
            {!user.isLoggedIn && <UserNotLoggedIn />}
            {user.isLoggedIn && <UserLoggedIn />}
        </ScreenBackground>
    );
};
