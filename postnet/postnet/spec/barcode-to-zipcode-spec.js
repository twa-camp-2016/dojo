/*global describe,it,expect*/

'use strict';

let {buildSplittedBarcode, checkBarcode} = require('../src/barcode-to-zipcode.js');

describe('zipcodeToBarcode', () => {

    it('去除两边的横杆', () => {
        const input = '|::|::|';
        const result = [':', ':', '|', ':', ':'];
        const expectResult = buildSplittedBarcode(input);

        expect(expectResult).toEqual(result);
    });

    describe('checkBarcode', () => {
        it('五位合法输入', () => {
            const input = [':', ':', ':', '|', '|', ':', ':', '|', ':', '|', ':', ':', '|', '|', ':', ':', '|', ':', ':', '|', ':', '|', ':', '|', ':', ':', '|', ':', '|', ':'];
            const result = [ ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:' ];
            const allCodes = ['||:::', ':::||', '::|:|', '::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
            const expectResult = checkBarcode(input,allCodes);

            expect(expectResult).toEqual(result);
        });
    });
});