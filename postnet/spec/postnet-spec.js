let _ = require('lodash');
let {checkZipCode, formatZipCode,addCheckCD,trans2Barcode} = require('../src/postnet.js');
let {loadBarcodeList} = require('../src/loadBarcodeTable.js');

describe('postnet', function () {
    it('formatZipCodeWithout-', function () {
      let zipCode = "123456789";
      let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let formattedZipCode = formatZipCode(zipCode);
      expect(formattedZipCode).toEqual(expected);
    });
    it('formatZipCode', function () {
      let zipCode = "12345-6789";
      let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let formattedZipCode = formatZipCode(zipCode);
      expect(formattedZipCode).toEqual(expected);
    });
  it('addCheckCD',function () {
    let formattedZipCode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let expected = [1,2,3,4,5,6,7,8,9,5];
    let checkCDZipCode = addCheckCD(formattedZipCode);
    expect(checkCDZipCode).toEqual(expected);
  });
  it('trans2Barcode',function () {
    let checkCDZipCode = [1,2,3,4,5,5];
    let barcodeList = loadBarcodeList();
    let expected = {
      type: true,
      code:':::||::|:|::||::|::|:|:|::|:|:'
    };
    let barcode = trans2Barcode(checkCDZipCode,barcodeList);
    expect(barcode).toEqual(expected);
  })

  }
);
