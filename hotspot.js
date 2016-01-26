/* global process */

var app = require('./app'),
    argv = require('minimist')(process.argv.slice(2));

var opts = {
    name: argv["n"],
    psw: argv["psw"]
}

var action;

if(argv["h"]) {
    action = "h";
} else if(argv["e"]) {
    action = "e";
} else if(argv["d"]) {
    action = "d";
} else if(argv["s"]) {
    action = "s";
} else if(argv["v"]) {
    action = "v";
}

if(!action) {
    console.error("Unknow option. Type -h for help.");
} else {
    app(opts, action);
}
