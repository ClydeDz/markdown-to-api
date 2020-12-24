function validateJSON(inputJSON){
    try{
        JSON.parse(inputJSON);
    } catch (err) {
        throw new Error(`An error occurred while parsing the JSON config file. Error details: ${err}`);
    }
}

function validateConfigFile(configFile){ 
    console.log(!configFile , configFile.length == undefined , configFile.length < 1);
    if(!configFile || configFile.length == undefined || configFile.length < 1) {
        throw new Error(`Invalid config file detected. Please supply a valid config file.`); 
    } 
}

exports.validateJSON = validateJSON;
exports.validateConfigFile = validateConfigFile; 
