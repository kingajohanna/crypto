module.exports = {
    preset: "react-native",
    transform: {
        "^.+\\.ts?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    },
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.jest.json",
        },
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transformIgnorePatterns: ["node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"],
    setupFiles: ["./jest/jest.setup.js", "<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"],
};
