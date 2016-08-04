// let {stripMargin} = require('stripmargin');
let commandBarcodeToZipcodePage = require('../commands/goto-barcode-to-zipcode-page');
let commandZipcodeToBarcodePage = require('../commands/goto-zipcode-to-barcode-page');
let commandExit = require('../commands/exit');
let commandInvalidInput = require('../commands/invalid-input');

module.exports = function () {
    return {
        text:
            '|1. Translate zip code to bar code \n|2. Translate bar code to zip code \n|3. Quit+ |Please input your choices(1~3)',
        newMapping: {
            "1": commandZipcodeToBarcodePage,
            "2": commandBarcodeToZipcodePage,
            "3": commandExit,
            "*": commandInvalidInput
        }
    }
};