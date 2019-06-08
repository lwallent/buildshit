var fs = require('fs');


let initializer = () => {
    console.log('starting: ' +  process.argv );
    console.log('current working directory: ' + process.cwd());

    
    let readPackage = () => {
        let options = {
            name: "My Context",
            scripts: {}
        }

        const ppath = process.cwd() + '/package.json';
        if (fs.existsSync(ppath)) {
            let package = require(ppath) || {};
            options = Object.assign(options, package)
        } 
        return options;
    }

    let addHeader = (stream, name) => {
       stream.write("let buildshit = require('buildshit');\n\n");
       stream.write("// FIRST CREATE THE CONTEXT\n");
       stream.write(`let context = buildshit.context("${name}", __dirname)\n\n`);
       stream.write("//====================================\n");
       stream.write("// COMMANDS\n");
       stream.write("//====================================\n");
       
    };
    let addCommands = (stream, cmds) => {
        console.log('cmds ->',cmds);
        Object.keys(cmds).forEach((task)=>{
            stream.write(`context.task("${task}").cmd("${cmds[task]}");\n`);
        });

    };
    let addFooter = (stream) => {
        stream.write("\n// EXPORT THE CONTEXT\n");
        stream.write("module.exports = context");
    };

    let writeTaskFile = (options) => {
        console.log('options ->',options );
        const tpath = process.cwd() + '/tasks.js';
        var stream = fs.createWriteStream(tpath);
        stream.once('open', function(fd) {
            addHeader(stream, options.name);
            addCommands(stream, options.scripts)
            addFooter(stream);
            stream.end();
        });

    }


    let options =  readPackage();

    writeTaskFile(options);
}



//EXPORT THE CONTEXT
module.exports = initializer;