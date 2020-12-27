const configFileSchema = require("./schema");
const constants = require("./constants");

function validateJSON(inputJSON){
    try{
        JSON.parse(inputJSON);
    } catch (err) {
        throw new Error(`An error occurred while parsing the JSON config file. Error details: ${err}`);
    }
}

function validateConfigFile(configFile){  
    if(!configFile) {
        throw new Error("Invalid config file detected. Please supply a valid config file."); 
    } 

    // Add schema validation
}

function isInputFileFilterValid(inputFileFilter) {
    let isValid = false;
    constants.VALID_FILE_EXTENSIONS.forEach((ele) => { 
        isValid = isValid || inputFileFilter.indexOf(ele) !== -1;
        return;
    });
    return isValid;
}

function isFilenameValid(filename) {
    let isValid = false;
    constants.VALID_FILENAME_EXTENSIONS.forEach((ele) => { 
        isValid = isValid || filename.indexOf(ele) !== -1;
        return;
    });
    return isValid;
}

function sanitizeConfigFile(configFile) {
    if(!configFile.output){
        configFile.output = constants.DEFAULT_OUTPUT_DIRECTORY;
    }
    if(!configFile.summaryOutput){
        configFile.summaryOutput = constants.DEFAULT_SUMMARY_OUTPUT_DIRECTORY;
    }
    if(!configFile.filename || !isFilenameValid(configFile.filename)){
        configFile.filename = constants.DEFAULT_SUMMARY_FILENAME;
    }
    if(!configFile.inputFileFilter || !isInputFileFilterValid(configFile.inputFileFilter)) {
        configFile.inputFileFilter = constants.VALID_FILE_EXTENSIONS[0];
    } 
    return configFile;
}

exports.validateJSON = validateJSON;
exports.validateConfigFile = validateConfigFile;
exports.sanitizeConfigFile = sanitizeConfigFile;
exports.isInputFileFilterValid = isInputFileFilterValid;
exports.isFilenameValid = isFilenameValid;