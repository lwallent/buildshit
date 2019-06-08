#! /usr/bin/env node
let buildshit = require('../src/buildshit');
let initializer = require('../src/initializer');

if (process.argv.includes('--help')) {
    console.log('run init: will create a first version of the task definition');
}


if (process.argv.includes('init')) {
    initializer();
}

