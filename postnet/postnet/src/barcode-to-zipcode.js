'use strict';

let _ = require('lodash');
let allCodes = require('../src/loadAllcodes');

let buildSplittedBarcode = function (input) {
    let splittedInput = input.split('');
    let splittedBarcode = _(splittedInput).slice(1, splittedInput.length - 1).value();

    return splittedBarcode;
};

let checkBarcode = function (splittedBarcode, allcodes) {

    let splittedBarcodes = _.chunk(splittedBarcode, 5);

    if ((splittedBarcodes.length === 6) || (splittedBarcodes.length === 10)) {

        let barcodes = checkBarcodeRight(splittedBarcodes, allcodes);

        if (barcodes !== 'invalid_barCode') {

            return checkDigit(barcodes, allcodes);
        }
        return 'invalid_barCode';
    }

    return 'invalid_barCode';
};

let checkDigit = function (barcodes, allcodes) {

    const index = _.map(barcodes, barcode => allcodes.indexOf(barcode));

    return _(_(index).slice(0, -1).sum()) % 10 === index[index.length - 1] ? barcodes : 'invalid_barCode';
};

function buildZipcode(barcodes, allcodes) {

    const barcode = _.chain(barcodes).chunk(5).value();
    const index = _.map(barcodes, barcode => allcodes.indexOf(barcode));

    return index.slice(0, index.length - 1).join('');
};

let checkBarcodeRight = function (splittedBarcodes, allcodes) {

    let barcodes = splittedBarcodes.map(n => n.join(''));

    return barcodes.map(n => allcodes.includes(n)) ? barcodes : 'invalid_barCode';
};


let changeBarcodeToZipcode = function (input) {
    let splittedBarcode = buildSplittedBarcode(input);
    let allcodes = allCodes();
    let barcodes = checkBarcode(splittedBarcode, allcodes);

    if (barcodes !== 'invalid_barCode') {

        return buildZipcode(barcodes, allcodes);
    }
    else {
        return 'invalid_barCode';
    }
};

module.exports = {changeBarcodeToZipcode, buildSplittedBarcode, checkBarcode, buildZipcode};
