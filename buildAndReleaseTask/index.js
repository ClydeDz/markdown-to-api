const tl = require("azure-pipelines-task-lib/task");
const fs = require("fs"); 
const cp = require("child_process");
const configFilePathKey = "configFilePath";

async function run() {
    try {  
        const configFile = tl.getPathInput(configFilePathKey, true, true);      
      
        let parsedJSON = [];
        fs.readFile(configFile, (err, data) => {
            if (err) throw err; 
            parsedJSON = JSON.parse(data); 

            // error if parsedJSON is empty

            for(var i=0; i<parsedJSON.length; i++){
                console.log(parsedJSON[i].input);   
                let inputDirectory = parsedJSON[i].input;
                let outputDirectory = parsedJSON[i].output;
                let summaryOutputDirectory = parsedJSON[i].summaryOutput;
                let summaryFilename = parsedJSON[i].filename;
                let inputFileFilter = parsedJSON[i].inputFileFilter;
                
                if (!fs.existsSync(outputDirectory)) {
                    fs.mkdirSync(outputDirectory, {recursive: true}, err => {});
                } 
                if (!fs.existsSync(summaryOutputDirectory)) {
                    fs.mkdirSync(summaryOutputDirectory, {recursive: true}, err => {});
                } 
                

                // Converting markdown to API
                //.\node_modules\.bin\processmd "portfolio/**/*.md" --stdout --outputDir testpoutput/testp > testp.json
                 
                let commandToExecute = `.\\node_modules\\.bin\\processmd "./${inputDirectory}/**/*${inputFileFilter}" --stdout --outputDir "./${outputDirectory}" > "./${summaryOutputDirectory}/${summaryFilename}"`;
                cp.exec(commandToExecute, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            }
            
        }); 
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();