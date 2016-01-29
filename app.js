/* global process */

var hotspot = require('node-hotspot');

module.exports = function(opts, arg) {

    var hotspotOpts = {
         ssid: opts['name'] || 'hotspot name', 
         password: opts['psw'] || '661bffc788h', 
         force: true, // (optional)  if hosting a network already turn it off and run ours.
         adaptor: 'Ethernet' // (optional / false) name of adaptor to have ICS (Internet Connection Sharing) share internet from, passing false disables ICS all together - if non givin node-hotspot will attempt to find currently connected adaptor automatically
    }
    
    var userCommand = "Action: ";
    var running = false;

    var start = function() {
        if(running) {
            console.log("Hotspot is already enabled.");
            customRead();
        } else {
            hotspot.enable(hotspotOpts)
                .then(function() {
                    console.log('Hotspot enabled');
                    running = true;
                    customRead();
                })
                .catch(function(e) {
                    console.log('Something went wrong; Perms?', e);
                    process.exit(1);
                });
        }
    }

    var stop = function() {
        hotspot.disable(hotspotOpts)
            .then(function() {
                console.log('Hotspot disable');
                process.exit(0);
            })
            .catch(function(e) {
                console.log('Something went wrong; Perms?', e);
                process.exit(1);
            });
    }

    var status = function() {
        hotspot.stats(hotspotOpts)
            .then(function(st) {
                console.log('Hotspot status:');
                Object.keys(st).forEach(function(element) {
                    console.log(element, ": ", st[element]);
                }, this);
                customRead();
            });
    }

    var verbose = function() {
        console.info("Hotspot name:", hotspotOpts["ssid"]);
        console.info("Password:", hotspotOpts["password"]);
        customRead();
    }

    var help = function() {
        var helpNote = [
            { command: "-h", desctiption: "show help"},
            { command: "-e", desctiption: "enable hotspot"},
            { command: "-d", desctiption: "disable hotspot"},
            { command: "-s", desctiption: "hotspot status"},
            { command: "-v", desctiption: "show hotspot name and password"}
        ];
        
        var argNote = [
            { command: "--n", desctiption: "(optional) hotspot name"},
            { command: "--psw", desctiption: "(optional) hotspot password"}
        ];
        
        console.log("Usage: node hotspot.js option [arguments]");
        console.log();
        console.log("Option:");
        helpNote.forEach(function(element) {
            console.log("  ", element.command, "\t", element.desctiption);
        }, this);
        
        console.log();
        console.log("Arguments for -e option:");
        argNote.forEach(function(element) {
            console.log("  ", element.command, "\t", element.desctiption);
        }, this);
        customRead();   
    }

    var execute = function(act) {
        switch (act.trim()) {
            case 'h':
                help();
                break;
            case 'e':
                start();
                break;
            case 'd':
                stop();
                break;
            case 'v':
                verbose();
                break;
            case 's':
                status();
                break;
            default:
                console.log("Unknown action ", act);
                customRead();
                break;
        }
    }
    
    
    
    var openConsole = function() {
        process.stdin.on('readable', () => {
            var chunk = process.stdin.read();
            resolveAction(chunk); 
        });

        process.stdin.on('end', () => {
            process.stdout.write('end');
        });
    }
    
    var resolveAction = function(chunk) {
        if (chunk !== null) {
            var actionCode = chunk.toString().slice(1).trim();
            if (actionCode.startsWith('e')) {
                if (!running) {
                    var eParts = actionCode.split('--');
                    eParts.forEach(function (element) {
                        var tr = element.trim();
                        if (tr.startsWith("n ")) {
                            var actualName = tr.replace("n ", "").trim();
                            hotspotOpts.ssid = !!actualName ? actualName : hotspotOpts.ssid;
                        } else if (tr.startsWith("psw ")) {
                            var actualPsw = tr.replace("psw ", "").trim();
                            hotspotOpts.password = !!actualPsw ? actualPsw : hotspotOpts.password;
                        }
                    }, this);
                }
                actionCode = "e";
            }
            execute(actionCode);
        }
    }
    
    var customRead = function() {
        console.log();
        process.stdout.write(userCommand);
    }
    
    openConsole();
    execute(arg);
}
