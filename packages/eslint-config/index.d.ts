import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

interface Configs {
    baseConfig: FlatConfig.ConfigArray;
    nodeConfig: FlatConfig.ConfigArray;
    browserConfig: FlatConfig.ConfigArray;
}

declare const configExport: Configs;

export = configExport;
