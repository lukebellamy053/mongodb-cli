#!/usr/bin/env node

import MongoHandler from '../index';
const fs = require("fs");
const clArgs = require("command-line-args");

const optionDefinitions = [
    { name: 'config', alias: 'c', type: String },
    { name: 'restore', alias: 'r', type: Boolean},
    {name: 'backup', alias: 'b', type: Boolean}
];

const args = clArgs(optionDefinitions);

console.log("Welcome To The MongoDB CLI Tool");

if(!args.config) {
    throw 'No configuration file found. Please specific the path to the configuration file use --config or -c';
}

const config = JSON.parse(fs.readFileSync(args.config));

const handler = new MongoHandler(config);


if(args.restore) {
    handler.restoreDatabase();
} else if(args.backup) {
    handler.dumpDatabase();
} else {
    console.error("No valid options found");
}

