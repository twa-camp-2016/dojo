/*global describe,it,expect*/

'use strict';

let {changeBarcodeToZipcode,buildSplittedBarcode, checkBarcode,buildZipcode} = require('../src/barcode-to-zipcode.js');

describe('zipcodeToBarcode', () => {

    it('去除两边的横杆', () => {
        const input = '|::|::||';
        const result = [':', ':', '|', ':', ':', '|'];
        const expectResult = buildSplittedBarcode(input);

        expect(expectResult).toEqual(result);
    });

    describe('checkBarcode', () => {
        it('六位合法输入', () => {
            const input = [':', ':', ':', '|', '|', ':', ':', '|', ':', '|', ':', ':', '|', '|', ':', ':', '|', ':', ':', '|', ':', '|', ':', '|', ':', ':', '|', ':', '|', ':'];
            const result = [ ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:' ];
            const allCodes = ['||:::', ':::||', '::|:|', '::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|:|'];
            const expectResult = checkBarcode(input,allCodes);

            expect(expectResult).toEqual(result);
        });
    });

    it('buildZipcode', () =>{
        const input = [ ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:' ];
        const result = '12345';
        const allCodes = ['||:::', ':::||', '::|:|', '::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
        const expectResult = buildZipcode(input,allCodes);

        expect(expectResult).toEqual(result);
    });

    it('changeBarcodeToZipcode', () =>{
        const input = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let allCodes = require('../src/loadAllcodes');
        const allcodes = allCodes();

        const result = changeBarcodeToZipcode(input,allcodes);
        const expected = '12345';

        expect(result).toEqual(expected);
    });
});