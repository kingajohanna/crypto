import { BASEURL } from "@constants/server";
import { fetchCoinsAction, fetchFavsAction, fetchMarketAction, setErrorAction } from "@stores/Actions";
import axios from "axios";

export const getMarketData = async (userId: string = "") => {
    try {
        setErrorAction("");
        const response = await axios.post(`${BASEURL}/crypto/allcoins`, {
            userId,
        });
        console.log(`[${response.data.status}]`, "[/crypto/allcoins]", response.data.message);
        fetchMarketAction(response.data.data);
    } catch (error: any) {
        setErrorAction("[/crypto/allcoins] " + error.message);
    }
};

export const getFavsMarket = async (userId: string = "") => {
    try {
        setErrorAction("");
        const response = await axios.post(`${BASEURL}/crypto/getfavs`, {
            userId,
        });
        console.log(`[${response.data.status}]`, "[/crypto/getfavs]", response.data.message);
        fetchFavsAction(response.data.data);
    } catch (error: any) {
        setErrorAction("[/crypto/getfavs] " + error.message);
    }
};

export const getCoins = async () => {
    try {
        setErrorAction("");
        const response = await axios.get(`${BASEURL}/crypto/coinlist`);

        if (response.data.message !== []) fetchCoinsAction(response.data.data);

        console.log(`[${response.data.status}]`, "[/crypto/coinlist]", response.data.message);
    } catch (error: any) {
        setErrorAction("[/crypto/coinlist] " + error.message);
    }
};
