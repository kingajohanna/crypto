import axios from "axios";
import moment from "moment";

export const addUser = async (id: string, email: string = "", name: string = "", createdAt: string = moment.now().toLocaleString()) => {
    try {
        const response = await axios.post("http://192.168.1.146:1337/users/adduser", {
            id: id,
            name: name,
            email,
            createdAt,
        });
        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
};
