import React from "react";

import { Tabs } from "@constants/Tabs";
import { ScreenBackground } from "@components/ScreenBackground";
import { AccountButton } from "@components/AccountButton";

export const AccountScreen = () => {
    return (
        <ScreenBackground title={Tabs.account}>
            <AccountButton.Email />
            <AccountButton.Apple />
            <AccountButton.Facebook />
            <AccountButton.Google />
            <AccountButton.Logout />
            <AccountButton.Delete />
        </ScreenBackground>
    );
};
