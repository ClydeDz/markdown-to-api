const assert = require("assert"); 
const util = require("../process/util/index");
const constants = require("../process/util/constants");

describe("isInputFileFilterValid()", function () {

    it("valid file extension detected", function () {
        let isValid = util.isInputFileFilterValid(".md"); 
        assert.strictEqual(isValid, true);
    }); 
    it("valid custom file extension detected", function () {
        let isValid = util.isInputFileFilterValid(".pin.md"); 
        assert.strictEqual(isValid, true);
    }); 
    it("invalid file extension detected", function () {
        let isValid = util.isInputFileFilterValid(".txt"); 
        assert.strictEqual(isValid, false);
    }); 

});

describe("sanitizeConfigValues()", function () {

    // inputFileExtension
    it("empty input file extension is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"inputFileExtension": ""}); 
        assert.strictEqual(sanitizedConfig.inputFileExtension, constants.VALID_INPUT_FILE_EXTENSIONS[0]);
    });  
    it("null input file extension is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"inputFileExtension": null}); 
        assert.strictEqual(sanitizedConfig.inputFileExtension, constants.VALID_INPUT_FILE_EXTENSIONS[0]);
    });  
    it("invalid input file extension is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"inputFileExtension": ".markd"}); 
        assert.strictEqual(sanitizedConfig.inputFileExtension, constants.VALID_INPUT_FILE_EXTENSIONS[0]);
    }); 
    it("valid input file extension is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"inputFileExtension": ".md"}); 
        assert.strictEqual(sanitizedConfig.inputFileExtension, ".md");
    }); 

    // summaryFilename
    it("empty summaryFilename is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"summaryFilename": ""}); 
        assert.strictEqual(sanitizedConfig.summaryFilename.indexOf("summaryJSON"), 0);
    });
    it("null summaryFilename is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"summaryFilename": null}); 
        assert.strictEqual(sanitizedConfig.summaryFilename.indexOf("summaryJSON"), 0);
    }); 
    it("valid summaryFilename is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"summaryFilename": "products.json"}); 
        assert.strictEqual(sanitizedConfig.summaryFilename, "products.json");
    }); 
    it("valid summaryFilename but invalid file extension is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"summaryFilename": "products.jayson"}); 
        assert.strictEqual(sanitizedConfig.summaryFilename.indexOf("summaryJSON"), 0);
    });

    // summaryOutputDir
    it("valid summary output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"summaryOutputDir": "output/mysummary"}); 
        assert.strictEqual(sanitizedConfig.summaryOutputDir, "output/mysummary");
    });
    it("empty summary output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"summaryOutputDir": ""}); 
        assert.strictEqual(sanitizedConfig.summaryOutputDir, "output/summary");
    });
    it("null summary output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"summaryOutputDir": null}); 
        assert.strictEqual(sanitizedConfig.summaryOutputDir, "output/summary");
    });

    // outputDir
    it("valid output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"outputDir": "output/all"}); 
        assert.strictEqual(sanitizedConfig.outputDir, "output/all");
    });
    it("empty output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"outputDir": ""}); 
        assert.strictEqual(sanitizedConfig.outputDir, "output/all");
    });
    it("null output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigValues({"outputDir": null}); 
        assert.strictEqual(sanitizedConfig.outputDir, "output/all");
    });

});

describe("isFilenameValid()", function () {

    it("valid summary filename extension detected", function () {
        let isValid = util.isFilenameValid("products.md"); 
        assert.strictEqual(isValid, false);
    }); 
    it("invalid summary filename extension detected", function () {
        let isValid = util.isFilenameValid("products.json"); 
        assert.strictEqual(isValid, true);
    }); 

});

describe("isJSONParsable()", function () {

    it("valid JSON supplied", function () {
        let validJSON = "{\"foo\":\"bar\"}";
        assert.doesNotThrow(() => util.isJSONParsable(validJSON));
    }); 
    it("null supplied", function () {
        assert.doesNotThrow(() => util.isJSONParsable(null));
    }); 
    it("undefined supplied", function () {
        assert.throws(() => util.isJSONParsable(undefined));
    });
    it("string supplied", function () {
        assert.throws(() => util.isJSONParsable("some random string"));
    }); 
    it("invalid JSON supplied", function () {
        let invalidJSON = "{'name': 1,}"; 
        assert.throws(() => util.isJSONParsable(invalidJSON)); 
    }); 
    it("invalid JSON supplied", function () {
        let invalidJSON = "{}"; 
        assert.doesNotThrow(() => util.isJSONParsable(invalidJSON)); 
    }); 
    it("invalid JSON supplied", function () {
        let invalidJSON = "[{}]"; 
        assert.doesNotThrow(() => util.isJSONParsable(invalidJSON)); 
    }); 

});

describe("validateConfigFile()", function () {

    it("valid config supplied", function () {
        let parsedJSON = JSON.parse("[{\"inputDir\":\"bar\"}]");  
        assert.doesNotThrow(() => util.validateConfigFile(parsedJSON));
    }); 
    it("invalid config supplied because its a single object", function () { 
        let parsedJSON = JSON.parse("{\"foo\":\"bar\"}"); 
        assert.throws(() => util.validateConfigFile(parsedJSON));
    }); 
    it("invalid config supplied because its missing the require input property", function () {
        let parsedJSON = JSON.parse("[{\"foo\":\"bar\"}]");  
        assert.throws(() => util.validateConfigFile(parsedJSON));
    }); 
    it("null config supplied", function () {
        let parsedJSON = JSON.parse(null); 
        assert.throws(() => util.validateConfigFile(parsedJSON));
    });  
    it("invalid config supplied", function () {
        let parsedJSON = JSON.parse("[]"); 
        assert.throws(() => util.validateConfigFile(parsedJSON));
    }); 
    it("invalid config supplied because it doesn't contain any object(s)", function () {
        let parsedJSON = JSON.parse("[{}]"); 
        assert.throws(() => util.validateConfigFile(parsedJSON));
    });

});