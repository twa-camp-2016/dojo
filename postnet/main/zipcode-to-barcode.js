'use strict';
const _ = require('lodash');
function translateZipcodeToBarcode(zipcode,allCodes) {
    const result = checkZipcode(zipcode);
    if(result){
        const splittedZipcode = getSplittedZipcode(zipcode);
        const checkDigit = getCheckDigit(splittedZipcode);
        const barcode = getBarcode(checkDigit,allCodes);
    }else return '输入不符合要求';
}

function checkZipcode(zipcode) {
    let splittedZipcode = _.split(zipcode,'');
    let length = checkLength(splittedZipcode);
    let dashCount = checkDashCount(splittedZipcode);
    let dashLocation = checkDashLocation(splittedZipcode);
    let sign = checkSign(splittedZipcode);
    let number = checkPureNumber(splittedZipcode);
    if(length && dashCount && dashLocation && sign && number){
        return true;
    }else return false;
}

function checkLength(splittedZipcode) {
    if(splittedZipcode.length === 5 ||
        splittedZipcode.length === 9 ||
        splittedZipcode.length === 10){
        return true;
    }else return false;
}

function checkDashCount(splittedZipcode) {
    let count = 0;
    for(let code of splittedZipcode){
        if(code === '-'){
            count++;
        }
    }
    if(count > 1) return false;
    else return true;
}

function checkDashLocation(splittedZipcode) {
    if(splittedZipcode.length === 10) {
        let location = _.indexOf(splittedZipcode,'-');
        if(location != 5) return false;
        else return true;
    }else return true;
}

function checkSign(splittedZipcode) {
    if(splittedZipcode.length > 5) {
        return _.find(splittedZipcode, x => x != '#');
    }else return true;
}

function checkPureNumber(splittedZipcode) {
    for(let code of splittedZipcode){
        if(typeof  parseInt(code) === "number" || code === '-'){
            return true;
        }else return false;
    }
}

function getSplittedZipcode(zipcode) {
    if(zipcode.length === 5 || zipcode.length === 9){
        return _.chain(zipcode).split('').map(x => parseInt(x)).value();
    }else {
        return _.chain(zipcode).split('-').join('').split('').map(x => parseInt(x)).value();
    }
}

function getCheckDigit(splittedZipcode) {
    let sum = _.reduce(splittedZipcode,(prev,curr) => prev + curr,0);
    let digit = sum % 10;
    splittedZipcode.push(digit);
    return splittedZipcode;
}

function getBarcode(checkDigit,allCodes) {

    let code = _.map(checkDigit,x => allCodes[x]).join('');
    return `|${code}|`;
}
module.exports = {
    translateZipcodeToBarcode,
    checkZipcode,
    getSplittedZipcode,
    getCheckDigit,
    getBarcode
};
