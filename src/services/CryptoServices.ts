import { getFavs } from "@services/UserServices";
import axios from "axios";

export const getMarketData = async () => {
    try {
        const response = await axios.get("http://192.168.1.146:1337/crypto/allcoins");
        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getFavsMarket = async (userId: string) => {
    const coins = await getFavs(userId);
    try {
        const response = await axios.post("http://192.168.1.146:1337/crypto/getFavs", {
            coins: coins.coins,
        });

        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
};
