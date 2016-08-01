'use strict';

let _ = require('lodash');
let allCodes = require('../src/loadAllcodes');


let checkZipcode = function (input) {

    var zipcode = input.split('');

    if ((zipcode.length === 5) || zipcode.length === 9) {

        return checkFiveOrNine(zipcode);
    } else if (zipcode.length === 10 && zipcode[5] === '-') {

        return checkTen(zipcode);
    }

    return 'invalid_barcode';
};

let checkFiveOrNine = function (zipcode) {

    let number = _(zipcode).filter(n => n !== '-').value();

    return (number.length === 5 || number.length === 9) ? number : 'invalid_barcode';
};

let checkTen = function (zipcode) {
    let number = _(zipcode).filter(n => n !== '-').value();

    return number.length === 9 ? number : 'invalid_barcode';
};

let buildCheckDigit = function (zipcodes) {

    let zipcode = zipcodes.map(n => _(n).toNumber());
    let checkDigit = (10 - _(zipcode).sum() % 10);

    return checkDigit;
};

let buildBarcode = function (zipcodes, allCodes, number) {
    let checkcode = allCodes.filter(allCode => allCodes.indexOf(allCode) === number);
    let barcode = allCodes.filter(allCode => zipcodes.includes(allCodes.indexOf(allCode).toString()));

    return '|' + barcode.join('') + checkcode.join('') + '|';
};

let changeZipcodeToBarcode = function (input) {

    let zipcodes = checkZipcode(input);

    if (zipcodes !== 'invalid_barcode') {
        let checkDigit = buildCheckDigit(zipcodes);
        let allcodes = allCodes();

        return buildBarcode(zipcodes, allcodes, checkDigit);
    }

    return 'invalid_barcode';
};
module.exports = {changeZipcodeToBarcode, checkZipcode, buildCheckDigit, buildBarcode};