const path = require("path");
const tl = require("azure-pipelines-task-lib/task");
const fs = require("fs"); 
const util = require("./util/index");
const configFilePathKey = "configFilePath";

function printVersionInformation() {
    try {
        var versionArgs = new Array();
        versionArgs.push("--version");  
        tl.execSync("processmd", versionArgs);
    } catch (err) {
        throw new Error(`Please run 'Install Markdown to API Dependencies' before this task to install all the required dependencies. 
            Learn more here: https://github.com/ClydeDz/markdown-to-api#tasks.
            \n\nError details: ${err}`);
    }    
}

function processMarkdownToJSON(parsedJSON) {   
    for (var i=0; i<parsedJSON.length; i++) {  
        let configValues = util.sanitizeConfigValues(parsedJSON[i]);  
        
        if (!fs.existsSync(configValues.outputDir)) {
            fs.mkdirSync(configValues.outputDir, {recursive: true}, err => { throw err; });
        } 
        if (!fs.existsSync(configValues.summaryOutputDir)) {
            fs.mkdirSync(configValues.summaryOutputDir, {recursive: true}, err => { throw err; });
        } 

        var processmdArgs = new Array();
        processmdArgs.push(`./${configValues.inputDir}/**/*${configValues.inputFileExtension}`);  
        processmdArgs.push(`--stdout`);  
        processmdArgs.push(`--outputDir`);
        processmdArgs.push(`./${configValues.outputDir}`);
        processmdArgs.push(`--summaryOutput`);
        processmdArgs.push(`./${configValues.summaryOutputDir}/${configValues.summaryFilename}`);
        tl.execSync("processmd", processmdArgs);
    }
    console.log("\n\nCompleted the process successfully!");
}

function run() {
    tl.setResourcePath(path.join(__dirname, "task.json"));
    try {  
        const configFile = tl.getPathInput(configFilePathKey, true, true);
        fs.readFile(configFile, (err, data) => {
            if (err) {
                throw new Error("An error occurred while reading the JSON config file. Please try again later or report this issue on GitHub.");
            }
            util.isJSONParsable(data);
            let parsedJSON = JSON.parse(data); 
            util.validateConfigFile(parsedJSON); 
            printVersionInformation();
            processMarkdownToJSON(parsedJSON);
        }); 
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

// Starts here
run();