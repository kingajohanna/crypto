export const adduser = {
    status: "success",
    message: "user added successfully",
    data: {
        id: "DCzgasdfadKdDpkAWqHEw",
        email: "test@gmail.com",
        createdAt: 1648314794066,
        name: "bela",
        photoURL: "https://lh3.googleusercontent.com/a-/AOh14GjVLepb70SMpFXeAyqty8h58J9TQY7lw8wwsx4Oxg=s96-d",
    },
};

export const removeuser = {
    status: "success",
    message: "user removed successfully",
};

export const addfav = {
    status: "success",
    message: "coin added to favs successfully",
};

export const removefav = {
    status: "success",
    message: "coin removed from favs successfully",
};

export const addcoin = {
    status: "success",
    message: "coin added successfully",
    data: {
        id: "QjuLdgDdM1CkMnEMZOZg",
        userId: "DCzgasdfadKdDpkAWqH",
        coinId: "storj",
        holdings: 5,
        price: 2000,
        currency: "huf",
    },
};

export const getcoins = {
    status: "success",
    message: "fetch owned coins",
    data: [
        {
            userId: "DCzgasdfadKdDpkAWqH",
            id: "7s9J5XTfdaOthk0QIbMP",
            currency: "huf",
            coinId: "storj",
            holdings: 5,
            price: 2000,
            symbol: "storj",
            image: "https://assets.coingecko.com/coins/images/949/large/storj.png?1547034811",
            current_price: 375.7,
            name: "Storj",
        },
        {
            userId: "DCzgasdfadKdDpkAWqH",
            currency: "huf",
            holdings: 5,
            price: 2000,
            id: "QjuLdgDdM1CkMnEMZOZg",
            coinId: "storj",
            symbol: "storj",
            image: "https://assets.coingecko.com/coins/images/949/large/storj.png?1547034811",
            current_price: 375.7,
            name: "Storj",
        },
        {
            price: 159492,
            coinId: "storj",
            userId: "DCzgasdfadKdDpkAWqH",
            currency: "huf",
            id: "VB8cBlj3fRJ7cPSRiqFg",
            holdings: 9,
            symbol: "storj",
            image: "https://assets.coingecko.com/coins/images/949/large/storj.png?1547034811",
            current_price: 375.7,
            name: "Storj",
        },
        {
            id: "ZlH7U70fK7ChTCTogZfz",
            holdings: 5,
            currency: "huf",
            price: 2000,
            userId: "DCzgasdfadKdDpkAWqH",
            coinId: "storj",
            symbol: "storj",
            image: "https://assets.coingecko.com/coins/images/949/large/storj.png?1547034811",
            current_price: 375.7,
            name: "Storj",
        },
        {
            coinId: "storj",
            holdings: 5,
            price: 2000,
            id: "hssyU4lUp7R53eztlUsA",
            userId: "DCzgasdfadKdDpkAWqH",
            currency: "huf",
            symbol: "storj",
            image: "https://assets.coingecko.com/coins/images/949/large/storj.png?1547034811",
            current_price: 375.7,
            name: "Storj",
        },
    ],
};

export const setcoin = {
    status: "success",
    message: "coin edited successfully",
};
