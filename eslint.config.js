//@ts-check
const { nodeConfig } = require('@shared/eslint-config');

module.exports = nodeConfig.concat(
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
            },
        },
    },
    { ignores: ['apps/**', 'packages/**'] },
);
