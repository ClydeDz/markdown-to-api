const assert = require("assert"); 
const util = require("../process/util/index");

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