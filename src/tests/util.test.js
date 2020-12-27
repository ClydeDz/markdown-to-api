const assert = require("assert"); 
const util = require("../process/util/index");
const constants = require("../process/util/constants");

describe("isInputFileFilterValid()", function () {

    it("valid file extension detected", function () {
        let isValid = util.isInputFileFilterValid("*.md"); 
        assert.strictEqual(isValid, true);
    }); 
    it("valid custom file extension detected", function () {
        let isValid = util.isInputFileFilterValid("*pin.md"); 
        assert.strictEqual(isValid, true);
    }); 
    it("invalid file extension detected", function () {
        let isValid = util.isInputFileFilterValid("*.txt"); 
        assert.strictEqual(isValid, false);
    }); 

});

describe("sanitizeConfigFile()", function () {

    // inputFileFilter
    it("empty input file filter is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"inputFileFilter": ""}); 
        assert.strictEqual(sanitizedConfig.inputFileFilter, constants.VALID_FILE_EXTENSIONS[0]);
    });  
    it("null input file filter is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"inputFileFilter": null}); 
        assert.strictEqual(sanitizedConfig.inputFileFilter, constants.VALID_FILE_EXTENSIONS[0]);
    });  
    it("invalid input file filter is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"inputFileFilter": ".markd"}); 
        assert.strictEqual(sanitizedConfig.inputFileFilter, constants.VALID_FILE_EXTENSIONS[0]);
    }); 
    it("valid input file filter is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"inputFileFilter": ".md"}); 
        assert.strictEqual(sanitizedConfig.inputFileFilter, ".md");
    }); 

    // filename
    it("empty filename is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"filename": ""}); 
        assert.strictEqual(sanitizedConfig.filename.indexOf("summaryJSON"), 0);
    });
    it("null filename is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"filename": null}); 
        assert.strictEqual(sanitizedConfig.filename.indexOf("summaryJSON"), 0);
    }); 
    it("valid filename is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"filename": "products.json"}); 
        assert.strictEqual(sanitizedConfig.filename, "products.json");
    }); 
    it("valid filename but invalid file extension is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"filename": "products.jayson"}); 
        assert.strictEqual(sanitizedConfig.filename.indexOf("summaryJSON"), 0);
    });

    // summaryOutput
    it("valid summary output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"summaryOutput": "output/mysummary"}); 
        assert.strictEqual(sanitizedConfig.summaryOutput, "output/mysummary");
    });
    it("empty summary output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"summaryOutput": ""}); 
        assert.strictEqual(sanitizedConfig.summaryOutput, "output/summary");
    });
    it("null summary output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"summaryOutput": null}); 
        assert.strictEqual(sanitizedConfig.summaryOutput, "output/summary");
    });

    // output
    it("valid output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"output": "output/all"}); 
        assert.strictEqual(sanitizedConfig.output, "output/all");
    });
    it("empty output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"output": ""}); 
        assert.strictEqual(sanitizedConfig.output, "output/all");
    });
    it("null output directory is supplied", function () {
        let sanitizedConfig = util.sanitizeConfigFile({"output": null}); 
        assert.strictEqual(sanitizedConfig.output, "output/all");
    });

});

describe("isFilenameValid()", function () {

    it("valid filename extension detected", function () {
        let isValid = util.isFilenameValid("products.md"); 
        assert.strictEqual(isValid, false);
    }); 
    it("invalid filename extension detected", function () {
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
        let parsedJSON = JSON.parse("[{\"input\":\"bar\"}]");  
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