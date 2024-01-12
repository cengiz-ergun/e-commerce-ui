module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "prettier",
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
};
