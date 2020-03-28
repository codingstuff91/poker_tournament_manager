const validators = require('./../../src/utils/validators');
test("Should validate number", () => {
   expect(validators.validateNumber(1)).toBe(true);
});