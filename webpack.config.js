var path = require("path");
var webpack = require("webpack");
var yargs = require("yargs");
var pjson = require("./package.json")

var args = yargs.alias("p", "production").argv;
var environment = args.production ? "production" : "development";
var dev = (environment === "development");
console.log("Environment: %s", environment);
console.log("Application: %s@%s", pjson.name, pjson.version);

process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

const define = {
    ENVIRONMENT: JSON.stringify(environment),
    APP_NAME: JSON.stringify(pjson.name),
    APP_VERSION: JSON.stringify(pjson.version),
    "process.env.NODE_ENV": JSON.stringify(environment),
    "process.env.BABEL_ENV": JSON.stringify(environment)
};

var entry = dev ? [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./src/index.js",
] : "./src/index.js";

var output =  {
    filename: "bundle.js",
    path: path.resolve(__dirname, "static"),
    publicPath: "/static/" // necessary for HMR
};

var devtool = dev ? "inline-source-map" : "source-map";

var rules = [
    {
        test: /\.jsx?$/,
        use: [
            "babel-loader",
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ]
    }
];


var plugins = dev ? [
    new webpack.DefinePlugin(define),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
] : [
    new webpack.DefinePlugin(define)
];

var devServer = dev ? {
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    hot: true,
} : {};

module.exports = {
    //target: "electron-main",
    entry: entry,
    output: output,
    devtool: devtool,
    module: {
        rules: rules
    },
    plugins: plugins,
    devServer: devServer
};
