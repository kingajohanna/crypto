import { getFavs } from "@services/UserServices";
import { fetchFavsAction, fetchMarketAction } from "@stores/Actions";
import axios from "axios";

export const getMarketData = async (userId: string = "") => {
    try {
        const response = await axios.post("http://192.168.1.146:1337/crypto/allcoins", {
            userId,
        });
        fetchMarketAction(response.data.message);
    } catch (error) {
        console.log(error);
    }
};

export const getFavsMarket = async (userId: string) => {
    const coins = await getFavs(userId);
    try {
        const response = await axios.post("http://192.168.1.146:1337/crypto/getfavs", {
            coins: coins.coins,
        });
        fetchFavsAction(response.data.message);
    } catch (error) {
        console.log(error);
    }
};
