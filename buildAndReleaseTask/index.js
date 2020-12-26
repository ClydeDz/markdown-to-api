const tl = require("azure-pipelines-task-lib/task");
const fs = require("fs"); 
const cp = require("child_process");
const util = require("./util/index");
const configFilePathKey = "configFilePath";

function processJSON(parsedJSON) {
    
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

        // Converting markdown to API
        //.\node_modules\.bin\processmd "portfolio/**/*.md" --stdout --outputDir testpoutput/testp > testp.json
         
        let commandToExecute = `.\\node_modules\\.bin\\processmd "./${inputDirectory}/**/*${inputFileFilter}" --stdout --outputDir "./${outputDirectory}" > "./${summaryOutputDirectory}/${summaryFilename}"`;
        cp.exec(commandToExecute, (error, stdout, stderr) => {
            if (error) {
                throw new Error(`An error occurred while converting Markdown files into API. Details: ${error.message}`);
            }
            if (stderr) {
                throw new Error(`An error occurred while converting Markdown files into API. Details: ${stderr}`);
            } 
        });
    }
    console.log("Completed the process successfully");
}

function run() {
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