import path from "path";
import { Configuration, DllPlugin } from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { baseURL } from "./resources/webpack/common_config";

const resolve = (...paths: string[]) => path.resolve(__dirname, ...paths);

const webpack_config: Configuration = {
    entry: {
        common: ["react", "react-dom"],
    },
    output: {
        filename: "vendors.[fullhash:5].js",
        path: resolve("public/vendors"),
        library: "vendor_lib_[fullhash:5]",
        publicPath: baseURL("/"),
    },
    plugins: [
        new DllPlugin({
            name: "vendor_lib_[fullhash:5]",
            path: resolve("public/vendors/vendor-manifest.json"),
        }),
        new WebpackManifestPlugin({
            fileName: "manifest.json",
            writeToFileEmit: true,
            publicPath: baseURL("/vendors/"),
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!vendor-manifest.json"],
        }),
    ],
};

export default webpack_config;
