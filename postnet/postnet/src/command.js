let {changeZipcodeToBarcode} = require('../src/zipcode-to-barcode.js');
let {changeBarcodeToZipcode} = require('../src/barcode-to-zipcode');

function goToMenu() {
    return {
        'menu': `zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):`,
        'mainMenu':{
        'menu1': goToZipCodePageCommand,
        'menu2': goToBarCodePageCommand,
        'menu3': goToQuitPageCommand,
        'nextGoto':  goToDealErrorPageCommand}
    };
}

function goToZipCodePageCommand() {
    return {
        'menu': 'please input zipCode:',
        'mainMenu': {'nextGoto': getBarcode}
    };
}

function goToBarCodePageCommand() {
    return {
        'menu': 'please input zipCode:',
        'mainMenu': {'nextGoto': getZipCode}
    };
}

function goToQuitPageCommand() {
    process.exit();
}

function goToDealErrorPageCommand() {

    return {
        'menu': '请给出合法的输入!!!!',
        'reset': true
    };
}

function getBarcode(input) {
    let barCode = changeZipcodeToBarcode(input);

    if (barCode !== 'invalid_zipCode') {

        return {
            'menu': `您输入的zipCode转化为barCode为：  ${barCode}`,
            'reset': true
        };
    } else {
        return {
            'error': '请给出合法的输入!!!'
        };
    }
}

function getZipCode(input) {
    let zipCode = changeBarcodeToZipcode(input);

    if (zipCode !== 'invalid_barCode') {
        return {
            'menu': `您输入的barCode转化为zipCode为:   ${zipCode}`,
            'reset': true
        };
    } else {
        return {
            'error': '请输入合法的barCode!!!'
        };
    }
}

module.exports = {
    goToMenu,
    goToZipCodePageCommand,
    goToBarCodePageCommand,
    goToQuitPageCommand,
    goToDealErrorPageCommand,
    getBarcode,
    getZipCode
};
