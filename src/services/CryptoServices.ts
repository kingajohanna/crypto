import { BASEURL } from "@constants/server";
import { fetchCoinsAction, fetchFavsAction, fetchMarketAction } from "@stores/Actions";
import axios from "axios";

export const getMarketData = async (userId: string = "") => {
    try {
        const response = await axios.post(`${BASEURL}/crypto/allcoins`, {
            userId,
        });
        fetchMarketAction(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const getFavsMarket = async (userId: string = "") => {
    try {
        const response = await axios.post(`${BASEURL}/crypto/getfavs`, {
            userId,
        });
        fetchFavsAction(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const getCoins = async () => {
    try {
        const response = await axios.get(`${BASEURL}/crypto/coinlist`);
        if (response.data.message !== []) fetchCoinsAction(response.data.message);
    } catch (error) {
        console.log(error);
    }
};
