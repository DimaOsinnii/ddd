const baseConfig = require('./base');
const globals = require('globals');

module.exports = baseConfig.concat({
    languageOptions: {
        globals: {
            ...globals.node,
        },
    },

    rules: {
        '@typescript-eslint/no-var-requires': 'off',
    },
});
