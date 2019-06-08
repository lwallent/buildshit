#!/usr/bin/env node
var buildshit = require('./buildshit');
var invoke = buildshit.invoke;

var cwd = process.cwd();


//Either pass the tasks or load them from default location ...

//Load tasks
var tasksPath = cwd + '/tasks.js' // default path
var ctx = require(tasksPath);


var target = process.argv[2] || 'default';

ctx.invoke(target);



