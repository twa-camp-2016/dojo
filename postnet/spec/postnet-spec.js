let _ = require('lodash');
let {checkZipCode, formatZipCode, addCheckCD, trans2Barcode, formatBarcode, trans2Zipcode, checkCD, zipcodeToBarcode, barcodeToZipcode} = require('../src/postnet.js');
let {route} = require('../src/route.js');

let {loadBarcodeList} = require('../src/loadBarcodeTable.js');

xdescribe("postnet", function () {
    it('1.checkZipCodeWithLess5', function () {
      let zipCode = '1234';
      let expected = {type: false, code: '1234'};

      let incorrectZipCode = checkZipCode(zipCode);
      expect(incorrectZipCode).toEqual(expected);
    });
    it('2.checkZipCodeWith6', function () {
      let zipCode = '123456';
      let expected = {type: false, code: '123456'};

      let incorrectZipCode = checkZipCode(zipCode);
      expect(incorrectZipCode).toEqual(expected);
    });
    it('3.checkZipCodeWith8', function () {
      let zipCode = '12345678';
      let expected = {type: false, code: '12345678'};

      let incorrectZipCode = checkZipCode(zipCode);
      expect(incorrectZipCode).toEqual(expected);
    });
    it('4.checkZipCodeWith11', function () {
      let zipCode = '12345678910';
      let expected = {type: false, code: '12345678910'};

      let incorrectZipCode = checkZipCode(zipCode);
      expect(incorrectZipCode).toEqual(expected);
    });
    it('5.checkZipCodeWith5', function () {
      let zipCode = '12345';
      let expected = {type: true, code: '12345'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('6.checkZipCodeWith9', function () {
      let zipCode = '123456789';
      let expected = {type: true, code: '123456789'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('7.checkZipCodeWith10', function () {
      let zipCode = '123456789-';
      let expected = {type: false, code: '123456789-'};

      let incorrectZipCode = checkZipCode(zipCode);
      expect(incorrectZipCode).toEqual(expected);
    });
    it('8.checkZipCodeWith5-', function () {
      let zipCode = '1234-';
      let expected = {type: false, code: '1234-'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('9.checkZipCodeWith9-', function () {
      let zipCode = '123-56789';
      let expected = {type: false, code: '123-56789'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('10.checkZipCodeWithNo-', function () {
      let zipCode = '0123456789';
      let expected = {type: false, code: '0123456789'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('11.checkZipCodeWith2-', function () {
      let zipCode = '12345-78-';
      let expected = {type: false, code: '12345-78-'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('12.检查-位置', function () {
      let zipCode = '123456-789';
      let expected = {type: false, code: '123456-789'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('13.检查-位置', function () {
      let zipCode = '1234-56789';
      let expected = {type: false, code: '1234-56789'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('14.检查字符', function () {
      let zipCode = '1234a56789';
      let expected = {type: false, code: '1234a56789'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    it('15.检查字符', function () {
      let zipCode = '1234#56789';
      let expected = {type: false, code: '1234#56789'};
      let correctZipCode = checkZipCode(zipCode);
      expect(correctZipCode).toEqual(expected);
    });
    xit('16.formatZipCode', function () {
      let zipCode = "12345";
      let expected = [1, 2, 3, 4, 5];
      let formattedZipCode = formatZipCode(zipCode);
      expect(formattedZipCode).toEqual(expected);
    });
    it('17.addCheckCD', function () {
      let formattedZipCode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
      let checkCDZipCode = addCheckCD(formattedZipCode);
      expect(checkCDZipCode).toEqual(expected);
    });
    it('18.trans2Barcode', function () {
      let checkCDZipCode = [1, 2, 3, 4, 5, 5];
      let barcodeList = loadBarcodeList();
      let expected = {
        type: true,
        code: ':::||::|:|::||::|::|:|:|::|:|:'
      };
      let barcode = trans2Barcode(checkCDZipCode, barcodeList);
      expect(barcode).toEqual(expected);
    });
    it('19.检查输入的barcode少于6位', function () {
      let barcode = '|||::::::||::||::|::||';
      let expected = {type: false, code: '|||::::::||::||::|::||'};
      let correctBarcode = formatBarcode(barcode);
      expect(correctBarcode).toEqual(expected);
    });
    it('20.检查输入的barcode少于10位大于6位', function () {
      let barcode = '|||::::::||::||::|::|:|:|::||::|:::||';
      let expected = {type: false, code: '|||::::::||::||::|::|:|:|::||::|:::||'};
      let correctBarcode = formatBarcode(barcode);
      expect(correctBarcode).toEqual(expected);
    });
    it('21.检查输入的barcode大于10位', function () {
      let barcode = '|||::::::||::||::|::|:|:|::||::|:::||::|:|:|::||:::::|:||';
      let expected = {type: false, code: '|||::::::||::||::|::|:|:|::||::|:::||::|:|:|::||:::::|:||'};
      let correctBarcode = formatBarcode(barcode);
      expect(correctBarcode).toEqual(expected);
    });
    xit('22.formatBarcode', function () {
      let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
      let expected = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::', ':|:|:'];

      let formattedBarcode = formatBarcode(barcode);
      expect(formattedBarcode).toEqual(expected);
    });
    it('23.trans2Zipcode', function () {
      let formattedBarcode = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::', ':|:|:'];
      let expected = '1234567895';
      let barcodeList = loadBarcodeList();
      let zipcode = trans2Zipcode(formattedBarcode, barcodeList);
      expect(zipcode).toEqual(expected);
    });
    it('24.trans2ZipcodeWithFalse', function () {
      let formattedBarcode = ['||:|:', ':|:||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::', ':|:|:'];
      let expected = {
        type: false,
        code: ['||:|:', ':|:||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::', ':|:|:']
      };
      let barcodeList = loadBarcodeList();
      let zipcode = trans2Zipcode(formattedBarcode, barcodeList);
      expect(zipcode).toEqual(expected);
    });
    it('25.trans2ZipcodeWith5', function () {
      let formattedBarcode = [':::||', ':|::|', ':|:|:', ':||::', '|:|::', ':|:|:'];
      let expected = '145695';
      let barcodeList = loadBarcodeList();
      let zipcode = trans2Zipcode(formattedBarcode, barcodeList);
      expect(zipcode).toEqual(expected);
    });
    it('26.checkCD', function () {
      let zipcode = '01234567895';
      let expected = {type: true, code: '0123456789'};
      let finalZipcode = checkCD(zipcode);
      expect(finalZipcode).toEqual(expected);
    });
    it('27.checkCDWithFalse', function () {
      let zipcode = '1234567894';
      let expected = {type: false, code: '1234567894'};
      let finalZipcode = checkCD(zipcode);
      expect(finalZipcode).toEqual(expected);
    });
    it('28.checkCDWith' - '', function () {
      let zipcode = '1234567895';
      let expected = {type: true, code: '12345-6789'};
      let finalZipcode = checkCD(zipcode);
      expect(finalZipcode).toEqual(expected);
    });
  }
);
