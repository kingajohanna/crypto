import React, { useState } from "react";
import { AccountButton } from "@components/AccountButton";
import { DeleteAlert, LogoutAlert } from "@components/Alert";

/*
    account logout and delete buttons
*/
export const UserLoggedIn = () => {
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    return (
        <>
            <AccountButton.Logout onPress={() => setLogoutPopup(true)} />
            <AccountButton.Delete onPress={() => setDeletePopup(true)} />
            <LogoutAlert visible={logoutPopup} setVisible={setLogoutPopup} />
            <DeleteAlert visible={deletePopup} setVisible={setDeletePopup} />
        </>
    );
};
