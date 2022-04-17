import { BASEURL } from "@constants/server";
import { fetchOwnedCoinsAction, setErrorAction } from "@stores/Actions";
import axios from "axios";
import moment from "moment";

export const addUser = async (id: string, email: string = "", createdAt: string = moment.now().toLocaleString(), name: string = "", photoURL: string = "") => {
    try {
        setErrorAction("");
        const response = await axios.post(`${BASEURL}/users/adduser`, {
            id,
            name,
            email,
            createdAt,
            photoURL,
        });
        console.log(`[${response.data.status}]`, "[/users/adduser]", response.data.message);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/users/adduser] " + error.message);
        return error.message;
    }
};

export const removeUser = async (id: string) => {
    try {
        setErrorAction("");
        const response = await axios.post(`${BASEURL}/users/removeuser`, {
            id,
        });
        console.log(`[${response.data.status}]`, "[/users/removeuser]", response.data.message);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/users/removeuser] " + error.message);
        return error.message;
    }
};

export const addFav = async (userId: string, coinId: string) => {
    try {
        setErrorAction("");

        //jest testing - await needed
        await process.nextTick(() => {});
        const response = await axios.post(
            `${BASEURL}/users/addfav`,
            {
                userId,
                coinId,
            },
            { timeout: 1000 },
        );
        console.log(`[${response.data.status}]`, "[/users/addfav]", response.data.message);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/users/addfav] " + error.message);
        return error.message;
    }
};

export const removeFav = async (userId: string, coinId: string) => {
    try {
        setErrorAction("");

        //jest testing - await needed
        await process.nextTick(() => {});
        const response = await axios.post(
            `${BASEURL}/users/removefav`,
            {
                userId,
                coinId,
            },
            { timeout: 1000 },
        );
        console.log(`[${response.data.status}]`, "[/users/removefav]", response.data.message);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/users/removefav] " + error.message);
        return error.message;
    }
};

export const addCoin = async (userId: string, coinId: string, holdings: number, price: number, currency: string) => {
    try {
        setErrorAction("");

        //jest testing - await needed
        await process.nextTick(() => {});
        const response = await axios.post(`${BASEURL}/users/addcoin`, {
            userId,
            coinId,
            holdings,
            price,
            currency,
        });
        console.log(`[${response.data.status}]`, "[/users/addcoin]", response.data.message);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/users/addcoin] " + error.message);
        return error.message;
    }
};

export const getOwnedCoins = async (userId: string) => {
    try {
        setErrorAction("");

        //jest testing - await needed
        await process.nextTick(() => {});
        const response = await axios.post(`${BASEURL}/users/getcoins`, {
            userId,
        });

        console.log(`[${response.data.status}]`, "[/users/getcoins]", response.data.message);
        fetchOwnedCoinsAction(response.data.data);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/users/getcoins] " + error.message);
        return error.message;
    }
};

export const setCoin = async (id: string, purchasedHoldings: string, purchasedTotalCost: string, soldHoldings: string, soldTotalCost: string) => {
    try {
        setErrorAction("");

        //jest testing - await needed
        await process.nextTick(() => {});
        const response = await axios.post(`${BASEURL}/users/setcoin`, {
            id,
            purchasedHoldings,
            purchasedTotalCost,
            soldHoldings,
            soldTotalCost,
        });
        console.log(`[${response.data.status}]`, "[/users/setcoin]", response.data.message);
        fetchOwnedCoinsAction(response.data.data);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/users/setcoin] " + error.message);
        return error.message;
    }
};
