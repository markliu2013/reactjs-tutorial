import path from 'path';
import glob from 'glob';

let entry = {};
const files = glob.sync("js/**/*.js");
files.map(file=>{
	entry[file] = path.resolve(__dirname, file);
});

module.exports = {
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
}