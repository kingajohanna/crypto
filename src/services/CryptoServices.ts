import { BASEURL } from "@constants/server";
import { fetchCoinsAction, fetchFavsAction, fetchMarketAction } from "@actions/CryptoActions";
import { setErrorAction } from "@actions/ErrorActions";
import axios from "axios";
process.nextTick = setImmediate;

export const getMarketData = async (userId: string = "") => {
    try {
        setErrorAction("");

        //jest testing
        await process.nextTick(() => {});
        const response = await axios.post(
            `${BASEURL}/crypto/allcoins`,
            {
                userId,
            },
            { timeout: 15000 },
        );
        console.log(`[${response.data.status}]`, "[/crypto/allcoins]", response.data.message);
        fetchMarketAction(response.data.data);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/crypto/allcoins] " + error.message);
        return error.message;
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
        return response.data;
    } catch (error: any) {
        setErrorAction("[/crypto/getfavs] " + error.message);
        return error.message;
    }
};

export const getCoins = async () => {
    try {
        setErrorAction("");
        const response = await axios.get(`${BASEURL}/crypto/coinlist`);

        if (response.data.message !== []) fetchCoinsAction(response.data.data);

        console.log(`[${response.data.status}]`, "[/crypto/coinlist]", response.data.message);
        return response.data;
    } catch (error: any) {
        setErrorAction("[/crypto/coinlist] " + error.message);
        return error.message;
    }
};
