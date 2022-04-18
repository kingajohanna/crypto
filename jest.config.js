module.exports = {
    preset: "react-native",
    transform: {
        "^.+\\.ts?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    },
    globals: {
        "ts-jest": {
            isolatedModules: true,
            tsconfig: "tsconfig.jest.json",
        },
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transformIgnorePatterns: ["node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"],
    moduleNameMapper: {
        "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "^d3-(.*)$": `d3-$1/dist/d3-$1`,
    },
    setupFiles: ["./jest/jest.setup.js", "<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"],
};
