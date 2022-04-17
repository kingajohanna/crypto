import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { marketdata, favData, coins } from "../__mocks__/cryptoServiceMocks";
import { BASEURL } from "../src/constants/server";
import { getMarketData, getFavsMarket, getCoins } from "../src/services/CryptoServices";

describe("getMarketData", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return market coins", async () => {
            mock.onPost(`${BASEURL}/crypto/allcoins`).replyOnce(200, marketdata);

            // when
            const result = await getMarketData();

            // then

            expect(result).toEqual(marketdata);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/crypto/allcoins`).networkErrorOnce();

            // when
            const result = await getMarketData();

            // then

            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/crypto/allcoins`).replyOnce(500);

            // when
            const result = await getMarketData();

            // then

            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("getFavsData", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return favourite coins market", async () => {
            mock.onPost(`${BASEURL}/crypto/getfavs`).replyOnce(200, favData);

            // when
            const result = await getFavsMarket();

            // then
            expect(result).toEqual(favData);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/crypto/getfavs`).networkErrorOnce();

            // when
            const result = await getFavsMarket();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/crypto/getfavs`).replyOnce(500);

            // when
            const result = await getFavsMarket();

            // then

            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("getCoins", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return market coins", async () => {
            mock.onGet(`${BASEURL}/crypto/coinlist`).replyOnce(200, coins);

            // when
            const result = await getCoins();

            // then

            expect(result).toEqual(coins);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onGet(`${BASEURL}/crypto/coinlist`).networkErrorOnce();

            // when
            const result = await getCoins();

            // then

            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onGet(`${BASEURL}/crypto/coinlist`).replyOnce(500);

            // when
            const result = await getCoins();

            // then

            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

export default MockAdapter;
