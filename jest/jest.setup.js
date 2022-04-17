import "react-native-gesture-handler/jestSetup";
import MockedAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "../__mocks__/@react-native-google-signin/google-signin.js";

jest.mock("@react-native-async-storage/async-storage", () => MockedAsyncStorage);
jest.mock("react-native-reanimated", () => {
    const Reanimated = require("react-native-reanimated/mock");

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};

    return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@react-native-firebase/auth", () => ({
    GoogleAuthProvider: {
        credential: jest.fn(),
    },
}));

jest.mock("react-native/Libraries/Lists/FlatList", () => {
    const RN = jest.requireActual("react-native");
    return RN.ScrollView;
});

jest.mock("redux-persist", () => {
    const real = jest.requireActual("redux-persist");
    return {
        ...real,
        persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
    };
});
