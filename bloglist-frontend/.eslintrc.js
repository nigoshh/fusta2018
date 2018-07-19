module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest"
    ],
    "rules": {
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "eqeqeq": "error",
        "indent": [
            "error", 2
        ],
        "no-console": 0,
        "object-curly-spacing": [
            "error", "always"
        ],
        "quotes": [
            "error", "single"
        ],
        "react/prop-types": 0,
        "semi": [
            "error", "never"
        ]
    }
};
