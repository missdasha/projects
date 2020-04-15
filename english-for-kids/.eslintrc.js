module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'no-console': 'off',
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "no-dynamic-require": 0,
        "no-lonely-if": "off"
    }
};
