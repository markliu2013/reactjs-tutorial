import path from 'path';
import glob from 'glob';

let entry = {};
const files = glob.sync("src/**/*.js");
files.map(file=> {
    entry[file] = path.resolve(__dirname, file);
});

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: entry,
    output: {
        path: '/',
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    }
};
