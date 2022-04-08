import axios from "axios";
import moment from "moment";

export const addUser = async (id: string, email: string = "", createdAt: string = moment.now().toLocaleString(), name: string = "", photoURL: string = "") => {
    try {
        const response = await axios.post("http://192.168.1.146:1337/users/adduser", {
            id,
            name,
            email,
            createdAt,
            photoURL,
        });
        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const removeUser = async (id: string) => {
    try {
        const response = await axios.post("http://192.168.1.146:1337/users/removeuser", {
            id,
        });
        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
};
