const webpack = require("webpack");

const config = { staticFilesDirectory: "/Users/br1an/Code/hello-graphql/static" };

module.exports = {
    mode: "none",
    entry: "./graphiql.js",
    output: {
        filename: "bundle.js",
        path: config.staticFilesDirectory,
        assetModuleFilename: "[name][ext]"
    },
    module: {
        rules: [
            // https://webpack.js.org/loaders/css-loader/
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/,
                type: "asset/resource"
            }
        ]
    },
    resolve: { fallback: { "process/browser": require.resolve("process/browser"), } },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ]
};
