const path = require("path");
const tl = require("azure-pipelines-task-lib/task");
const fs = require("fs"); 
const util = require("./util/index");
const configFilePathKey = "configFilePath";

function processJSON(parsedJSON) {
    tl.setResourcePath(path.join(__dirname, "task.json"));
    for(var i=0; i<parsedJSON.length; i++){  
        let inputDirectory = parsedJSON[i].input;
        let outputDirectory = parsedJSON[i].output;
        let summaryOutputDirectory = parsedJSON[i].summaryOutput;
        let summaryFilename = parsedJSON[i].filename;
        let inputFileFilter = parsedJSON[i].inputFileFilter;
        
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, {recursive: true}, err => { throw err; });
        } 
        if (!fs.existsSync(summaryOutputDirectory)) {
            fs.mkdirSync(summaryOutputDirectory, {recursive: true}, err => { throw err; });
        } 

        var versionArgs = new Array();
        versionArgs.push("--version");  
        tl.execSync("processmd", versionArgs);

        var processmdArgs = new Array();
        processmdArgs.push(`./${inputDirectory}/**/*${inputFileFilter}`);  
        processmdArgs.push(`--stdout`);  
        processmdArgs.push(`--outputDir`);
        processmdArgs.push(`./${outputDirectory}`);
        processmdArgs.push(`--summaryOutput`);
        processmdArgs.push(`./${summaryOutputDirectory}/${summaryFilename}`);
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
            util.validateJSON(data);
            parsedJSON = JSON.parse(data); 
            util.validateConfigFile(parsedJSON); 
            processJSON(parsedJSON);
        }); 
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();