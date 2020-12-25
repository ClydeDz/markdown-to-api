const configFileSchema = require("./schema");

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

exports.validateJSON = validateJSON;
exports.validateConfigFile = validateConfigFile;