let {BarcodeToZipcode} = require('../src/postnet');
let {CommandResponse} = require('../src/command-response');

class BarcodeToZipcodeCommand{

  runCommand(barcode){
    let barcodeToZipcode = new BarcodeToZipcode;
    let zipcode = barcodeToZipcode.barcodeToZipcode(barcode);
    if(zipcode.type === true){
      return new CommandResponse({
        text: zipcode.code,
        reset: true
      })
    }else{
      return new CommandResponse({
        error: 'Please input correct barcode:',
      });
    }
  }
}

module.exports = BarcodeToZipcodeCommand;