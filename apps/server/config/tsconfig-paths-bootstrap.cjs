const tsConfig = require('./tsconfig.paths.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = "app";

tsConfigPaths.register({
    baseUrl,
    paths: Object.entries(tsConfig.compilerOptions.paths).reduce((newPaths, [key, pathArray]) => {
        newPaths[key] = pathArray.map((path) => path.split('/src').join(""))

        return newPaths
    }, {}),
});


