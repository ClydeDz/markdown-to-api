const path = require("path");
const tl = require("azure-pipelines-task-lib/task");
const fs = require("fs"); 
const util = require("./util/index");
const configFilePathKey = "configFilePath";

function processJSON(parsedJSON) { 
    var versionArgs = new Array();
    versionArgs.push("--version");  
    tl.execSync("processmd", versionArgs);

    for(var i=0; i<parsedJSON.length; i++) {  
        let configItem = util.sanitizeConfigFile(parsedJSON[i]);  
        
        if (!fs.existsSync(configItem.output)) {
            fs.mkdirSync(configItem.output, {recursive: true}, err => { throw err; });
        } 
        if (!fs.existsSync(configItem.summaryOutput)) {
            fs.mkdirSync(configItem.summaryOutput, {recursive: true}, err => { throw err; });
        } 

        var processmdArgs = new Array();
        processmdArgs.push(`./${configItem.input}/**/*${configItem.inputFileFilter}`);  
        processmdArgs.push(`--stdout`);  
        processmdArgs.push(`--outputDir`);
        processmdArgs.push(`./${configItem.output}`);
        processmdArgs.push(`--summaryOutput`);
        processmdArgs.push(`./${configItem.summaryOutput}/${configItem.filename}`);
        tl.execSync("processmd", processmdArgs);
    }
    console.log("Completed the process successfully");
}

function run() {
    tl.setResourcePath(path.join(__dirname, "task.json"));
    try {  
        const configFile = tl.getPathInput(configFilePathKey, true, true);
        let parsedJSON = [];
        fs.readFile(configFile, (err, data) => {
            if (err) {
                throw new Error("An error occurred while reading the JSON config file. Please try again later or report this issue on GitHub.");
            }
            util.isJSONParsable(data);
            parsedJSON = JSON.parse(data); 
            util.validateConfigFile(parsedJSON); 
            processJSON(parsedJSON);
        }); 
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();