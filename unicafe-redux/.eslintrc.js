module.exports = {
    "env": {
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "beforeAll": false,
        "beforeEach": false,
        "console": false,
        "describe": false,
        "document": false,
        "expect": false,
        "it": false,
        "jest": false,
        "localStorage": false,
        "setTimeout": false,
        "window": false
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "eqeqeq": "error",
        "indent": [
            "error", 2
        ],
        "linebreak-style": [
            "error", "windows"
        ],
        "no-console": 0,
        "object-curly-spacing": [
            "error", "always"
        ],
        "quotes": [
            "error", "single"
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "semi": [
            "error", "never"
        ]
    },
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "16.4",
            "flowVersion": "0.75"
        }
    }
};
