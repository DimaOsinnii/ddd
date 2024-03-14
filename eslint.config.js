//@ts-check
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            ['import']: importPlugin,
            ['simple-import-sort']: simpleImportSortPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2020,
                ...globals.node,
            },
            parserOptions: {
                allowAutomaticSingleRunInference: true,
                cacheLifetime: {
                    // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
                    // in the rare case that we do - just need to manually restart their IDE.
                    glob: 'Infinity',
                },
                project: [
                    'tsconfig.json',
                    'apps/*/tsconfig.json',
                    'packages/*/tsconfig.json',
                    'apps/client/tsconfig.node.json',
                ],
                tsconfigRootDir: import.meta.dirname,
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',

            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-absolute-path': 'error',
            'import/no-mutable-exports': 'error',
            'import/no-self-import': 'error',

            'simple-import-sort/imports': 'error',
        },
    },
    {
        ignores: ['**/dist/**', '**/node_modules/**'],
    },
);
