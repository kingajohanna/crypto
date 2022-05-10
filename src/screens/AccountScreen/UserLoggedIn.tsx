import React, { useState } from "react";
import { AccountButton } from "@components/AccountButton";
import { DeleteAlert, LogoutAlert } from "@components/Alert";

/*
    account logout and delete buttons
*/
export const UserLoggedIn = () => {
    const [deletePopup, setDeletePopup] = useState(false);

    return (
        <>
            <AccountButton.Logout onPress={() => LogoutAlert()} />
            <AccountButton.Delete onPress={() => setDeletePopup(true)} />
            <DeleteAlert visible={deletePopup} setVisible={setDeletePopup} />
        </>
    );
};
