const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },
    eslintConfigPrettier,
);
