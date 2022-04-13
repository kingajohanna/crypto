import { BASEURL } from "@constants/server";
import { fetchOwnedCoinsAction } from "@stores/Actions";
import axios from "axios";
import moment from "moment";

export const addUser = async (id: string, email: string = "", createdAt: string = moment.now().toLocaleString(), name: string = "", photoURL: string = "") => {
    try {
        const response = await axios.post(`${BASEURL}/users/adduser`, {
            id,
            name,
            email,
            createdAt,
            photoURL,
        });
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const removeUser = async (id: string) => {
    try {
        const response = await axios.post(`${BASEURL}/users/removeuser`, {
            id,
        });
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const addFav = async (userId: string, coinId: string) => {
    try {
        const response = await axios.post(`${BASEURL}/users/addfav`, {
            userId,
            coinId,
        });
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const removeFav = async (userId: string, coinId: string) => {
    try {
        const response = await axios.post(`${BASEURL}/users/removefav`, {
            userId,
            coinId,
        });
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const addCoin = async (userId: string, coinId: string, holdings: number, price: number, currency: string) => {
    try {
        const response = await axios.post(`${BASEURL}/users/addcoin`, {
            userId,
            coinId,
            holdings,
            price,
            currency,
        });
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const getOwnedCoins = async (userId: string) => {
    try {
        const response = await axios.post(`${BASEURL}/users/getcoins`, {
            userId,
        });

        fetchOwnedCoinsAction(response.data.data);
    } catch (error) {
        console.log(error);
    }
};

export const setCoin = async (id: string, purchasedHoldings: string, purchasedTotalCost: string, soldHoldings: string, soldTotalCost: string) => {
    try {
        const response = await axios.post(`${BASEURL}/users/setcoin`, {
            id,
            purchasedHoldings,
            purchasedTotalCost,
            soldHoldings,
            soldTotalCost,
        });
        console.log(response.data.message);
    } catch (error) {
        console.log(error);
    }
};
