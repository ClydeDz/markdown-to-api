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
    const errorMessage = `Invalid config file detected. Please supply a valid config file.`;
    if(!configFile || configFile.length == undefined || configFile.length < 1) {
        throw new Error(errorMessage); 
    } 
    const validate = require("jsonschema").validate;
    if(!validate(configFile, configFileSchema).valid){
        throw new Error(errorMessage); 
    }
}

function isInputFileFilterValid(inputFileFilter) {
    !constants.VALID_FILE_EXTENSIONS.includes(inputFileFilter);
}

function sanitizeConfigFile(configFile) {
    if(!configFile.output){
        configFile.output = constants.DEFAULT_OUTPUT_DIRECTORY;
    }
    if(!configFile.summaryOutput){
        configFile.summaryOutput = constants.DEFAULT_SUMMARY_OUTPUT_DIRECTORY;
    }
    if(!configFile.filename){
        configFile.filename = constants.DEFAULT_SUMMARY_FILENAME;
    }
    if(!configFile.inputFileFilter || isInputFileFilterValid(configFile.inputFileFilter)) {
        configFile.inputFileFilter = constants.VALID_FILE_EXTENSIONS[0];
    } 
    return configFile;
}

exports.validateJSON = validateJSON;
exports.validateConfigFile = validateConfigFile;
exports.sanitizeConfigFile = sanitizeConfigFile;