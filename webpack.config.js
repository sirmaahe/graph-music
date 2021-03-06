const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
        loader: 'babel-loader',
        options: {
            presets:["@babel/preset-env", "@babel/preset-react", "minify"],
            plugins: [["relay", { "schema": "./shared/schema.json" }]]
        }
        }
    }]
    },
    output: {filename: 'app.js', path: path.resolve(__dirname, 'dist')}
}
