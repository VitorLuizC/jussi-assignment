"use strict";

const path = require("path");

const config = {
    entry: path.join(__dirname, "./src/script/main.js"),
    output: {
        path: path.join(__dirname, "./src"),
        filename: "script.js"
    }
};

module.exports = config;
