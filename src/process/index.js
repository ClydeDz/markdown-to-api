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
        let configValues = util.sanitizeConfigValues(parsedJSON[i]);  
        
        if (!fs.existsSync(configValues.output)) {
            fs.mkdirSync(configValues.output, {recursive: true}, err => { throw err; });
        } 
        if (!fs.existsSync(configValues.summaryOutput)) {
            fs.mkdirSync(configValues.summaryOutput, {recursive: true}, err => { throw err; });
        } 

        var processmdArgs = new Array();
        processmdArgs.push(`./${configValues.input}/**/*${configValues.inputFileFilter}`);  
        processmdArgs.push(`--stdout`);  
        processmdArgs.push(`--outputDir`);
        processmdArgs.push(`./${configValues.output}`);
        processmdArgs.push(`--summaryOutput`);
        processmdArgs.push(`./${configValues.summaryOutput}/${configValues.filename}`);
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