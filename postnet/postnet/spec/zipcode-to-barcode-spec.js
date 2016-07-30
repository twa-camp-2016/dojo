/*global describe,it,expect*/

'use strict';

let {changeZipcodeToBarcode, checkZipcode, buildCheckDigit, buildBarcode} = require('../src/zipcode-to-barcode.js');

describe('postnet', ()=>{

    describe('checkZipcode', () => {
        it('输入为五位数', () => {
            const input = '12345';
            const result = ['1','2','3','4','5'];
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });

        it('输入为九位数', () => {
            const input = '123456789';
            const result = ['1','2','3','4','5','6','7','8','9'];
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });

        it('输入为十位数[1个横杠]', () => {
            const input = '12345-6789';
            const result = ['1','2','3','4','5','6','7','8','9'];
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为四位数,返回invalid_barcode', () => {
            const input = '1234';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为六位数,返回invalid_barcode', () => {
            const input = '123456';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为八位数,返回invalid_barcode', () => {
            const input = '12345789';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为十一位数,返回invalid_barcode', () => {
            const input = '12345678910';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为两个横杠时,返回invalid_barcode', () => {
            const input = '1234567--89';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });
        it('当输入横杠位置不正确时,返回invalid_barcode', () => {
            const input = '1234-56789';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });
        it('当输入横杠位置不正确时,返回invalid_barcode', () => {
            const input = '123456-789';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });
        it('当输入含有#时,返回invalid_barcode', () => {
            const input = '123456#789';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });
        it('当输入有字母时,返回invalid_barcode', () => {
            const input = '123456#789';
            const result = 'invalid_barcode';
            const expectResult = checkZipcode(input);
            expect(expectResult).toEqual(result);
        });
    });

    describe('计算校验码', () => {
        it('输入为五位合法有效数', () => {
            let input = ['1','2','3','4','5'];
            let expectResult = buildCheckDigit(input);
            let result = 5;
            expect(expectResult).toEqual(result);
        });

        it('输入为九位或十位有效数', () => {
            let input = ['1','2','3','4','5','6','7','8','9'];
            let expectResult = buildCheckDigit(input);
            let result = 5;
            expect(expectResult).toEqual(result);
        });
    });

    it('buildBarcode', () => {
        let allCodes = ['||:::', ':::||', '::|:|', '::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
        let input = ['1','2','3','4','5'];
        let checkCode = 5;
        let expectResult = buildBarcode(input,allCodes,checkCode);

        let result = '|:::||::|:|::||::|::|:|:|::|:|:|';
        expect(expectResult).toEqual(result);
    });

    describe('changeZipcodeToBarcode', () => {
        it('输入为五位合法有效数', () => {
            const input = '12345';
            const result = '|:::||::|:|::||::|::|:|:|::|:|:|';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('输入为九位合法有效数', () => {
            const input = '123456789';
            const result = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('输入为十位数[1个横杠]', () => {
            const input = '12345-6789';
            const result = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为四位数,返回invalid_barcode', () => {
            const input = '1234';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为六位数,返回invalid_barcode', () => {
            const input = '123456';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为八位数,返回invalid_barcode', () => {
            const input = '12345789';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为十一位数,返回invalid_barcode', () => {
            const input = '12345678910';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入为两个横杠时,返回invalid_barcode', () => {
            const input = '1234567--89';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });
        it('当输入横杠位置不正确时,返回invalid_barcode', () => {
            const input = '1234-56789';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });
        it('当输入横杠位置不正确时,返回invalid_barcode', () => {
            const input = '123456-789';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入含有#时,返回invalid_barcode', () => {
            const input = '123456#789';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });

        it('当输入有字母时,返回invalid_barcode', () => {
            const input = '123456#789';
            const result = 'invalid_barcode';
            const expectResult = changeZipcodeToBarcode(input);
            expect(expectResult).toEqual(result);
        });
    });
});