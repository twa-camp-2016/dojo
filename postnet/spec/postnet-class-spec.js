let {ZipcodeToBarcode} = require('../src/postnet');

describe("postnet", function () {
  fit('zipcodeToBarcode',function () {
    let input = 12345;
    let expected = '|:::||::|:|::||::|::|:|:|:|';

    let barcode = new ZipcodeToBarcode();
    let code = barcode.zipcodeToBarcode(input);

    expect(code).toEqual(expected);
  })
});