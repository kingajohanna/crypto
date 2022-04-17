import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { adduser, removeuser, addfav, removefav, addcoin, getcoins, setcoin } from "../__mocks__/userServiceMocks";
import { BASEURL } from "../src/constants/server";
import { addUser, removeUser, addFav, removeFav, addCoin, getOwnedCoins, setCoin } from "../src/services/UserServices";

describe("addUser", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return users data", async () => {
            mock.onPost(`${BASEURL}/users/adduser`).replyOnce(200, adduser);

            // when
            const result = await addUser();

            // then
            expect(result).toEqual(adduser);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/adduser`).networkErrorOnce();

            // when
            const result = await addUser();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/adduser`).replyOnce(500);

            // when
            const result = await addUser();

            // then
            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("removeUser", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return success message", async () => {
            mock.onPost(`${BASEURL}/users/removeuser`).replyOnce(200, removeuser);

            // when
            const result = await removeUser();

            // then
            expect(result).toEqual(removeuser);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/removeuser`).networkErrorOnce();

            // when
            const result = await removeUser();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/removeuser`).replyOnce(500);

            // when
            const result = await removeUser();

            // then
            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("addFav", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return success message", async () => {
            mock.onPost(`${BASEURL}/users/addfav`).replyOnce(200, addfav);

            // when
            const result = await addFav();

            // then
            expect(result).toEqual(addfav);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/addfav`).networkErrorOnce();

            // when
            const result = await addFav();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/addfav`).replyOnce(500);

            // when
            const result = await addFav();

            // then
            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("removeFav", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return success message", async () => {
            mock.onPost(`${BASEURL}/users/removefav`).replyOnce(200, removefav);

            // when
            const result = await removeFav();

            // then
            expect(result).toEqual(removefav);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/removefav`).networkErrorOnce();

            // when
            const result = await removeFav();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/removefav`).replyOnce(500);

            // when
            const result = await removeFav();

            // then
            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("addCoin", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return added coin data", async () => {
            mock.onPost(`${BASEURL}/users/addcoin`).replyOnce(200, addcoin);

            // when
            const result = await addCoin();

            // then
            expect(result).toEqual(addcoin);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/addcoin`).networkErrorOnce();

            // when
            const result = await addCoin();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/addcoin`).replyOnce(500);

            // when
            const result = await addCoin();

            // then
            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("getOwnedCoins", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return owned coins data", async () => {
            mock.onPost(`${BASEURL}/users/getcoins`).replyOnce(200, getcoins);

            // when
            const result = await getOwnedCoins();

            // then
            expect(result).toEqual(getcoins);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/getcoins`).networkErrorOnce();

            // when
            const result = await getOwnedCoins();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/getcoins`).replyOnce(500);

            // when
            const result = await getOwnedCoins();

            // then
            expect(result).toEqual("Request failed with status code 500");
        });
    });
});

describe("setCoin", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterAll(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return edited coin data", async () => {
            mock.onPost(`${BASEURL}/users/setcoin`).replyOnce(200, setcoin);

            // when
            const result = await setCoin();

            // then
            expect(result).toEqual(setcoin);
        });
    });

    describe("when API call fails", () => {
        it("should return network error status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/setcoin`).networkErrorOnce();

            // when
            const result = await setCoin();

            // then
            expect(result).toEqual("Network Error");
        });
    });
    describe("when API call fails", () => {
        it("should return internal error (500) status", async () => {
            // given
            mock.onPost(`${BASEURL}/users/setcoin`).replyOnce(500);

            // when
            const result = await setCoin();

            // then
            expect(result).toEqual("Request failed with status code 500");
        });
    });
});
export default MockAdapter;
