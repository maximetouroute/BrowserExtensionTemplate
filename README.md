# BrowserExtensionTemplate

Structuring a cross-browser extension project is a mess. So I made this simple and straightforward cross-browser extension template.

## Overview
    * build : your build folder. Every build goes as /build/<PLATFORM>/<BUILD_TARGET>/
    * background : your background script
    * src/content : your content script
    * src/popup : your popup webapp
    * src/common : folder to put all your helpers, libs, configs that needs to be accessed by multiple bundles
    * src/static : All the static files to be copied at root of the build app.
    * env.js : env variables for usage inside your app


## Set-up & Usage
* `npm install`
* Dev build : `npm run buildChrome` or `npm run buildFirefox`
* Prod build (uglified) : `npm run deployChrome` or `npm run deployFirefox`

## Handled platforms
* Chrome
* Firefox

## Libs
* [Webpack](https://github.com/webpack/webpack)
* [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
* [babel](https://github.com/babel/babel)
