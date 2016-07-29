let {
    getFormatedZipcode,
    getArrayZipcode,
    getCheckNumber,
    getBarcode,
    getFormatedBarcode,
    getZipcodeArray,
    getZipcode,
    buildBarcode,
    buildZipcode
}=require('../src/main');
let {loadAllItems}=require('../src/items');

describe('getBarcode unit test', function () {
    it('getFormatedZipcode_1', function () {
        let zipcode = '12345';
        let formatedZipcode = '12345';
        let result = getFormatedZipcode(zipcode);
        expect(formatedZipcode).toEqual(result);
    });

    it('getFormatedZipcode_2', function () {
        let zipcode = '12345-6789';
        let formatedZipcode = '123456789';
        let result = getFormatedZipcode(zipcode);
        expect(formatedZipcode).toEqual(result);
    });

    it('getFormatedZipcode_3', function () {
        let zipcode = '123456789';
        let formatedZipcode = '123456789';
        let result = getFormatedZipcode(zipcode);
        expect(formatedZipcode).toEqual(result);
    });

    it('getArrayZipcode', function () {
        let formatedZipcode = '123456789';
        let arrayZipcode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let result = getArrayZipcode(formatedZipcode);
        expect(arrayZipcode).toEqual(result);
    });

    it('getCheckNumber', function () {
        let arrayZipcode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let checkNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
        let result = getCheckNumber(arrayZipcode);
        expect(checkNumber).toEqual(result);
    });

    it('getBarcode', function () {
        let checkNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
        let allItems = loadAllItems();
        let barcode ='|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let result = getBarcode(allItems,checkNumber);
        expect(barcode).toEqual(result);
    });
});

describe('buildBarcode test',function () {
    it('buildBarcode_1',function () {
        let zipcode = '12345-6789';
        let barcode ='|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let result = buildBarcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildBarcode_2',function () {
        let zipcode = '12345';
        let barcode ='|:::||::|:|::||::|::|:|:|::|:|:|';
        let result = buildBarcode(zipcode);
        expect(barcode).toEqual(result);
    });

});


describe('getZipcode unit test',function () {
    it('getFormtedBarcode',function () {
        let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let formatedBarcode = [':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
        let result = getFormatedBarcode(barcode);
        expect(formatedBarcode).toEqual(result);
    });

    it('getZipcodeArray',function () {
        let formatedBarcode = [':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
        let arrayZipcode = [1,2,3,4,5,6,7,8,9];
        let allItems = loadAllItems();
        let result = getZipcodeArray(allItems,formatedBarcode);
        expect(arrayZipcode).toEqual(result);
    });

    it('getZipcode',function () {
        let arrayZipcode = [1,2,3,4,5,6,7,8,9];
        let zipcode = '12345-6789';
        let result = getZipcode(arrayZipcode);
        expect(zipcode).toEqual(result);
    });

    it('getZipcode',function () {
        let arrayZipcode = [1,2,3,4,5];
        let zipcode = '12345';
        let result = getZipcode(arrayZipcode);
        expect(zipcode).toEqual(result);
    });
});

describe('buildZipcode test',function () {
    it('buildZipcode_1',function () {
        let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let zipcode = '12345-6789';
        let result = buildZipcode(barcode);
        expect(zipcode).toEqual(result);
    });

    it('buildZipcode_2',function () {
        let zipcode = '12345';
        let barcode ='|:::||::|:|::||::|::|:|:|::|:|:|';
        let result = buildZipcode(barcode);
        expect(zipcode).toEqual(result);
    });
});


