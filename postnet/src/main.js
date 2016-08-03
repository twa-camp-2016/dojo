let {loadAllItems, correntBarcode}=require('../src/items');

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
    return getBarcode(allItems, checkNumber);
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


function buildZipcode(barcode) {
    let formatedBarcode = getFormatedBarcode(barcode);
    let zipcodeArray = getZipcodeArray(loadAllItems(), formatedBarcode);
    return getZipcode(zipcodeArray);
}

function buildJudgeExecuteZipcode(zipcode) {
    if (zipcode.length === 5) {
        let arrayZipcode = _.split(zipcode, '');
        let numberZipcode = _.map(arrayZipcode, (n)=> {
            return parseInt(n);
        });
        let found = _.includes(numberZipcode, NaN);
        if (found) {
            return 'please enter the correct zipcode!'
        } else {
            return buildBarcode(zipcode);
        }
    } else if (zipcode.length === 9) {
        let arrayZipcode = _.split(zipcode, '');
        let numberZipcode = _.map(arrayZipcode, (n)=> {
            return parseInt(n);
        });
        let found = _.includes(numberZipcode, NaN);
        if (found) {
            return 'please enter the correct zipcode!'
        } else {
            return buildBarcode(zipcode);
        }
    } else if (zipcode.length === 10) {
        let first_ = _.indexOf('-');
        let last_ = _.lastIndexOf('-');
        if (first_ === last_) {
            let array = _.split(zipcode, '-');
            if (array[0].length === 5 && array[1].length === 4) {
                let numberArray_0 = _.map(array[0], (n)=> {
                    return parseInt(n);
                });
                let numberArray_1 = _.map(array[1], (n)=> {
                    return parseInt(n);
                });
                let found_0 = _.includes(numberArray_0, NaN);
                let found_1 = _.includes(numberArray_1, NaN);
                if (found_0) {
                    return 'please enter the correct zipcode!'
                } else if (found_1) {
                    return 'please enter the correct zipcode!'
                } else {
                    return buildBarcode(zipcode);
                }
            } else {
                return 'please enter the correct zipcode!'
            }
        } else if (first_ !== last_) {
            return 'please enter the correct zipcode!'

        } else {
            return 'please enter the correct zipcode!'
        }
    } else {
        return 'please enter the correct zipcode!'
    }

}

function judgeBarcode(allBarcode, barcodeArray) {
    let i = 0;
    for (let subItems of barcodeArray) {
        if (_.includes(allBarcode, subItems)) {
            i++;
        }
    }
    return i;
}

function buildJudgeExecuteBarcode(barcode) {
    let array = _.split(barcode, '');
    if (array[0] === '|' && array[array.length - 1] === '|') {
        let dropFrist = _.drop(array);
        let dropLast = _.dropRight(dropFrist);
        if (dropLast.length === 30 || dropLast.length === 50) {
            let arrayBarcode = _.chunk(dropLast, dropLast.length / (dropLast.length / 5));
            let subBarcodes = _.map(arrayBarcode, (arr)=> {
                return arr.join('');
            });
            let allBarcode = correntBarcode();
            let found = judgeBarcode(allBarcode, subBarcodes);
            if (found === subBarcodes.length) {
                let checkBarcode = _.drop(subBarcodes, subBarcodes.length - 1);
                let allItems = loadAllItems();
                let {zipcode} = getMateZipcode(checkBarcode[0], allItems);
                let formatedBarcode = getFormatedBarcode(barcode);
                let zipcodeArray = getZipcodeArray(loadAllItems(), formatedBarcode);
                let zipcodeSum = _.sum(zipcodeArray);
                if (zipcode === 10 - zipcodeSum % 10) {
                    return buildZipcode(barcode);
                } else if (10 - zipcode % 10 === 10 && zipcode === 0) {
                    return buildZipcode(barcode);
                }
                else {
                    return 'please enter the correct barcode!'
                }
            } else {
                return 'please enter the correct barcode!'
            }
        } else {
            return 'please enter the correct barcode!'
        }
    } else {
        return 'please enter the correct barcode!'
    }
}

function zipcodeToBarcode(zipcode) {
    let result = buildJudgeExecuteZipcode(zipcode);
    if(zipcode === 'please enter the correct barcode!'){
        return {
            error:result
        }
    }else {
        return{
            text:result,
            reset:ture
        }
    }
}

module.exports = {
    getFormatedZipcode: getFormatedZipcode,
    getArrayZipcode: getArrayZipcode,
    getCheckNumber: getCheckNumber,
    getBarcode: getBarcode,
    getFormatedBarcode: getFormatedBarcode,
    getZipcodeArray: getZipcodeArray,
    getZipcode: getZipcode,
    buildBarcode: buildBarcode,
    buildZipcode: buildZipcode,
    buildJudgeExecuteZipcode: buildJudgeExecuteZipcode,
    buildJudgeExecuteBarcode,
    zipcodeToBarcode
};
