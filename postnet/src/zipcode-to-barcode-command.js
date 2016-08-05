let {CommandResponse} = require('../src/command-response');
let {ZipcodeToBarcode} = require('../src/postnet');

class ZipcodeToBarcodeCommand{
    runCommand(zipcode){
    let barcode = new ZipcodeToBarcode();
    barcode = barcode.zipcodeToBarcode(zipcode);
    if (barcode.type === true) {
      return new CommandResponse({
        text: barcode.code,
        reset: true
      })
    }else{
      return new CommandResponse({
        error: 'Please input correct zipcode:',
      })
    }
  }
}

module.exports = ZipcodeToBarcodeCommand;