import React from "react";

import { Tabs } from "@constants/Tabs";

import { AccountButton } from "@components/AccountButton";
import { ScreenBackground } from "@components/ScreenBackground";

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
