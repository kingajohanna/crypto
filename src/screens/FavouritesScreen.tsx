import * as React from "react";
import { ScreenBackground } from "@components/ScreenBackground";
import { Tabs } from "@constants/Tabs";
import { useSelector } from "react-redux";
import { RootState } from "@stores/userStore";
import { Button } from "@components/Button";

export const FavouriteScreen = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <ScreenBackground title={Tabs.favourites}>
            {user.isLoggedIn && <Button title="user" onPress={() => console.log(user)} />}
            {!user.isLoggedIn && <Button title="nincs user" />}
        </ScreenBackground>
    );
};
