const constants = require("./constants");

function isJSONParsable(inputJSON){
    try{
        JSON.parse(inputJSON);
    } catch (err) {
        throw new Error(`An error occurred while parsing the JSON config file. Error details: ${err}`);
    }
}

function validateConfigFile(configFile) {  
    if(!configFile || configFile.length == undefined || configFile.length < 1) {
        throw new Error("Invalid config file detected. Please supply a valid config file."); 
    }  

    for(let i=0; i<configFile.length; i++) { 
        let element = configFile[0];
        if(!element.inputDir){
            throw new Error("Config file doesn't contain 'inputDir' property. Please supply an input directory."); 
        }
    }
}

function isInputFileFilterValid(inputFileFilter) {
    let isValid = false;
    constants.VALID_INPUT_FILE_EXTENSIONS.forEach((ele) => { 
        isValid = isValid || inputFileFilter.indexOf(ele) !== -1;
        return;
    });
    return isValid;
}

function isFilenameValid(filename) {
    let isValid = false;
    constants.VALID_SUMMARY_FILENAME_EXTENSIONS.forEach((ele) => { 
        isValid = isValid || filename.indexOf(ele) !== -1;
        return;
    });
    return isValid;
}

function sanitizeConfigValues(configFile) {
    if(!configFile.outputDir){
        configFile.outputDir = constants.DEFAULT_OUTPUT_DIRECTORY;
    }
    if(!configFile.summaryOutputDir){
        configFile.summaryOutputDir = constants.DEFAULT_SUMMARY_OUTPUT_DIRECTORY;
    }
    if(!configFile.summaryFilename || !isFilenameValid(configFile.summaryFilename)){
        configFile.summaryFilename = constants.DEFAULT_SUMMARY_FILENAME;
    }
    if(!configFile.inputFileExtension || !isInputFileFilterValid(configFile.inputFileExtension)) {
        configFile.inputFileExtension = constants.VALID_INPUT_FILE_EXTENSIONS[0];
    } 
    return configFile;
}

exports.isJSONParsable = isJSONParsable;
exports.validateConfigFile = validateConfigFile;
exports.sanitizeConfigValues = sanitizeConfigValues;
exports.isInputFileFilterValid = isInputFileFilterValid;
exports.isFilenameValid = isFilenameValid;