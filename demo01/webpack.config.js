const path = require('path');

const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'none',
    entry: {
        index: './src/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST_PATH
    },
    devServer: {
        contentBase: DIST_PATH,
        compress: true,
        open: true,
        port: 3000
    }
};
