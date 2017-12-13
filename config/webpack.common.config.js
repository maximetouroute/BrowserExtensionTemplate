var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require("copy-webpack-plugin");

let platformPlugins = {
    chrome: [
        new webpack.DefinePlugin({
            BROWSER_EXTENSION_PLATFORM: JSON.stringify({browserPlatform:'CHROME'})
        })
    ],
    firefox: [
        new webpack.DefinePlugin({
            BROWSER_EXTENSION_PLATFORM: JSON.stringify({browserPlatform:'FIREFOX'})
        })
    ]
};

module.exports = function(env, argv) {


    let platform = getPlatformFromEnv(env);
    let buildTarget = getBuildTargetFromEnv(env);

    console.log('BUILD TARGET: ' + buildTarget);
    console.log('BROWSER PLATFORM: ' + platform);

    let plugins = platformPlugins[platform];
    let copyPlugin =  new CopyWebpackPlugin([{ from: './src/static' }, { from: './src/popup/popup.html' } ]);

    if ( buildTarget === 'prod' ) {
        let uglifyPlugin = new webpack.optimize.UglifyJsPlugin({sourceMap: true});
        plugins.push(uglifyPlugin);
    }

    plugins.push(copyPlugin);

    return {
        entry: {
            content: "./src/content/content.js",
            background: "./src/background/background.js",
            popup: "./src/popup/popup.js"
            // older versions of webpack may require an empty entry point declaration here
            // common: []
        },
        output: {
            path: path.join(__dirname, "/../build/" + platform + "/" + buildTarget + "/"),
            filename: "[name].js"
        },
        plugins: plugins,
        module: {
            loaders: [
                {
                    test: /\.(jpe?g|gif|png|ico|svg|woff|ttf|wav|mp3)$/,
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]'
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },

        stats: {
            colors: true
        },
        devtool: 'source-map'
    };
};


const handledPlatforms = ['chrome', 'firefox'];
const defaultPlatform = 'chrome';
function getPlatformFromEnv(env) {
    if ( env === void 0 || env.platform === void 0 ) {
        return defaultPlatform;
    }
    else if ( handledPlatforms.includes(env.platform) ) {
        return env.platform;
    } else {
        throw new Error('Wrong platform given as CLI argument : ' + env.platform
            + '- Handled build targets are:' + JSON.stringify(handledPlatforms))
    }
}

const handledBuildTargets = ['dev', 'prod'];
const defaultBuildTarget = 'dev';
function getBuildTargetFromEnv(env) {
    if ( env === void 0 || env.platform === void 0 ) {
        return defaultBuildTarget;
    }
    else if ( handledBuildTargets.includes(env.buildTarget) ) {
        return env.buildTarget;
    } else {
        throw new Error('Wrong build target given as CLI argument : ' + env.buildTarget
            + '- Handled build targets are:' + JSON.stringify(handledBuildTargets))
    }
}
