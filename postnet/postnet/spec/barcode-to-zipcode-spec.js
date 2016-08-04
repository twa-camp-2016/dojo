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
        const input = '|:::||::|sa';
        let allCodes = require('../src/loadAllcodes.js');
        const result = changeBarcodeToZipcode(input);
        const expected = 'invalid_barCode';

        expect(result).toEqual(expected);
    });
});