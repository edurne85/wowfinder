const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@components': path.resolve(__dirname, '../src/components'),
            '@hooks': path.resolve(__dirname, '../src/hooks'),
            '@model': path.resolve(__dirname, '../src/types'),
            '@utils': path.resolve(__dirname, '../src/utils'),
        },
    },
    module: {
        rules: require('./rules.webpack'),
    },
};

