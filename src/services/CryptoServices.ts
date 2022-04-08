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
