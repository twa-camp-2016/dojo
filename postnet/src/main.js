let {loadAllItems}=require('../src/items');

let _ = require('lodash');

function getFormatedZipcode(zipcode) {
    return _.camelCase(zipcode);
}

function getArrayZipcode(formatedZipcode) {
    let zipcodeSting = _.split(formatedZipcode, '');
    return _.map(zipcodeSting, (n)=> {
        return parseInt(n);
    });
}

function getCheckNumber(arrayZipcode) {
    let sum = _.sum(arrayZipcode);
    let checkNum = 10 - sum % 10;
    return _.concat(arrayZipcode, checkNum);
}

function getMateBarcode(n, allItems) {
    return _.find(allItems, b => b.zipcode === n);
}
function getBarcode(allItems, checkNumberBarcode) {
    let barcodes = _.map(checkNumberBarcode, (n)=> {
        let {barcode} = getMateBarcode(n, allItems);
        return barcode;
    });
    return `|${barcodes.join('')}|`;

}

function buildBarcode(zipcode) {
    let formatedZipcode = getFormatedZipcode(zipcode);
    let arrayZipcode = getArrayZipcode(formatedZipcode);
    let checkNumber = getCheckNumber(arrayZipcode);
    let allItems = loadAllItems();
    let barcode = getBarcode(allItems, checkNumber);
    return barcode;
}


function getFormatedBarcode(barcode) {
    let array = _.split(barcode, '');
    let dropFirst = _.drop(array);
    let dropLast = _.dropRight(dropFirst);
    let dropCheck = _.dropRight(dropLast, 5);
    let arrayBarcode = _.chunk(dropCheck, dropCheck.length / (dropCheck.length / 5));
    let subBarcodes = _.map(arrayBarcode, (arr)=> {
        return arr.join('');
    });

    return _.flatMapDeep(subBarcodes);
}

function getMateZipcode(barcode, allItems) {
    return _.find(allItems, (item)=>item.barcode === barcode);
}
function getZipcodeArray(allItems, formatedBarcodes) {
    return _.map(formatedBarcodes, (n)=> {
        let {zipcode} = getMateZipcode(n, allItems);
        return zipcode;
    });
}

function getZipcode(zipcodeArray) {
    if (zipcodeArray.length === 9) {
        let front = _.dropRight(zipcodeArray, 4).join('');
        let behind = _.drop(zipcodeArray, 5).join('');
        return `${front}-${behind}`;
    } else {
        return zipcodeArray.join('');
    }
}
let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
function buildZipcode(barcode) {
    let formatedBarcode = getFormatedBarcode(barcode);
    let zipcodeArray = getZipcodeArray(loadAllItems(), formatedBarcode);
    let zipcode = getZipcode(zipcodeArray);
    return zipcode;
}
console.log(getFormatedBarcode(barcode));
console.log(getZipcodeArray(loadAllItems(), getFormatedBarcode(barcode)));
console.log(getZipcode(getZipcodeArray(loadAllItems(), getFormatedBarcode(barcode))));
console.log(buildZipcode(barcode));

module.exports = {
    getFormatedZipcode: getFormatedZipcode,
    getArrayZipcode: getArrayZipcode,
    getCheckNumber: getCheckNumber,
    getBarcode: getBarcode,
    getFormatedBarcode: getFormatedBarcode,
    getZipcodeArray: getZipcodeArray,
    getZipcode: getZipcode,
    buildBarcode: buildBarcode,
    buildZipcode: buildZipcode
}
