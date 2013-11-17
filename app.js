#!/usr/bin/env node

var path = require("path"),
    sys = require("sys"),
    fs = require("fs"),
    Server = require("./Server"),
    exec = require('child_process').exec;

var argv = require('optimist')
    .usage('Usage: $0 [filename] --port [num] --command [string] --view [string]')
    .demand(['_'])
    .describe('port', 'Port to listen to')
    .describe('command', 'Command to parse markdown to html')
    .describe('view', 'Command to execute after the server is setup')
    .default('port', 3000)
    .default('command', 'pandoc --mathjax -N -t HTML5')
    .argv;

var filepath = path.resolve(__dirname, argv['_'][0]);
var port = argv['port'];

var server = Server(port, filepath, argv['command'], function(){
    if(argv['view']){
        exec(argv['view']);
    }
});