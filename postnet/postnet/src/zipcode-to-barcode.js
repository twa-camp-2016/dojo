'use strict';

let _ = require('lodash');
let allCodes = require('../src/loadAllcodes');

class checkZipcode {
    checkZipcode(input) {

        var zipcode = input.split('');

        if ((zipcode.length === 5) || zipcode.length === 9) {
            let a = new checkFiveOrNine;
            return a.checkFiveOrNine(zipcode);
        } else if (zipcode.length === 10 && zipcode[5] === '-') {
            let b = new checkTen;
            return b.checkTen(zipcode);
        }

        return 'invalid_zipCode';
    }


}

class checkFiveOrNine{
    checkFiveOrNine(zipcode) {

        let number = _(zipcode).filter(n => n !== '-').value();

        return (number.length === 5 || number.length === 9) ? number : 'invalid_zipCode';
    }
}

class checkTen{

    checkTen(zipcode) {
        let number = _(zipcode).filter(n => n !== '-').value();

        return number.length === 9 ? number : 'invalid_zipCode';
    }
}

class buildCheckDigit {
    buildCheckDigit(zipcodes) {

        let zipcode = zipcodes.map(n => _(n).toNumber());
        let checkDigit = (10 - _(zipcode).sum() % 10);

        return checkDigit;
    };
}

class buildBarcode {
    buildBarcode(zipcodes, allCodes, number) {
        let checkcode = allCodes.filter(allCode => allCodes.indexOf(allCode) === number);
        let barcode = allCodes.filter(allCode => zipcodes.includes(allCodes.indexOf(allCode).toString()));

        return '|' + barcode.join('') + checkcode.join('') + '|';
    };
}

class changeZipcodeToBarcode {

    changeZipcodeToBarcode(input) {
        let a = new checkZipcode;
        let zipcodes = a.checkZipcode(input);

        if (zipcodes !== 'invalid_zipCode') {
            let b = new buildCheckDigit;
            let checkDigit = b.buildCheckDigit(zipcodes);
            let allcodes = allCodes();
            let c = new buildBarcode;
            return c.buildBarcode(zipcodes, allcodes, checkDigit);
        }

        return 'invalid_zipCode';
    };
}

module.exports = {changeZipcodeToBarcode, checkZipcode, buildCheckDigit, buildBarcode};