import React from "react";
import axios from "axios";
import moment from "moment";
import { MarketData } from "@constants/MarketData";

const formatSparkline = (numbers: any) => {
    const sevenDaysAgo = moment().subtract(7, "days").unix();
    let formattedSparkline = numbers.map((item: any, index: any) => {
        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item,
        };
    });

    return formattedSparkline;
};

const formatMarketData = (data: any) => {
    // @ts-ignore
    let formattedMarketData = [];

    data.message.data.forEach((element: { sparkline_in_7d: { price: number } }) => {
        const formattedSparkline = formatSparkline(element.sparkline_in_7d.price);

        const formattedElement = {
            ...element,
            sparkline_in_7d: {
                price: formattedSparkline,
            },
        };

        formattedMarketData.push(formattedElement);
    });
    // @ts-ignore
    return formattedMarketData;
};

export const getMarketData = async () => {
    try {
        const response = await axios.get("http://localhost:1337/crypto/allcoins");
        const data = response.data;
        return formatMarketData(data);
    } catch (error) {
        console.log(error);
        return 0;
    }
};
