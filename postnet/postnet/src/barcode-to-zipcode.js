'use strict';

let _ = require('lodash');
let allCodes = require('../src/loadAllcodes.js');

let buildSplittedBarcode = function(input){
    let splittedInput = input.split('');
    let splittedBarcode = _(splittedInput).slice(1,splittedInput.length-1).value();

    return splittedBarcode;
};

let checkBarcode = function(splittedBarcode, allcodes){
    let splittedBarcodes = _.chunk(splittedBarcode,5);

    if((splittedBarcodes.length === 6) || (splittedBarcodes.length === 10)){

        //let ;
        let barcodes = checkBarcodeRight(splittedBarcodes, allcodes);

        barcodes !== 'invalid_barcodes' ? (barcodes = checkDigit()) : barcodes = 'invalid_barcode';
    }

    return 'invalid_barcode';
};

let checkBarcodeRight = function(splittedBarcodes, allcodes){

    let barcodes = splittedBarcodes.map(n => n.join(''));

    return  barcodes.map(n => allcodes.includes(n)) ? barcodes : 'invalid_barcode';
};

module.exports = {buildSplittedBarcode,checkBarcode};