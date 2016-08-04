let {changeZipcodeToBarcode} = require('../src/zipcode-to-barcode.js');
let {changeBarcodeToZipcode} = require('../src/barcode-to-zipcode');

class GoToMenu {

    translate() {
        return {
            'menu': `zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):`,
            'mainMenu': {
                'menu1': GoToZipCodePageCommand,
                'menu2': GoToBarCodePageCommand,
                'menu3': GoToQuitPageCommand,
                'nextGoto': GoToDealErrorPageCommand
            }
        };
    }
}

class GoToZipCodePageCommand {

    translate() {
        return {
            'menu': 'please input zipCode:',
            'mainMenu': {'nextGoto': GetBarCode}
        };
    }
}

class GoToBarCodePageCommand {
    translate() {
        return {
            'menu': 'please input zipCode:',
            'mainMenu': {'nextGoto': GetZipCode}
        };
    }
}

class GoToQuitPageCommand {
    translate() {
        process.exit();
    }
}

class GoToDealErrorPageCommand {

    translate() {

        return {
            'menu': '请给出合法的输入!!!!',
            'reset': true
        };
    }
}
class GetBarCode {

    translate(input) {
        let a = new changeZipcodeToBarcode;
        let barCode = a.changeZipcodeToBarcode(input);

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
}

class GetZipCode {

    translate(input) {
        let a = new changeBarcodeToZipcode;
        let zipCode = a.changeBarcodeToZipcode(input);

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
}

module.exports = {
    GoToMenu,
    GoToZipCodePageCommand,
    GoToBarCodePageCommand,
    GoToQuitPageCommand,
    GoToDealErrorPageCommand,
    GetBarCode,
    GetZipCode
};
