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
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
        "^d3-(.*)$": `d3-$1/dist/d3-$1`,
    },
    setupFiles: ["./jest/jest.setup.js", "<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"],
};
