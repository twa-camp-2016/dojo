let {CommandResponse} = require('../src/command-response');
let {ZipcodeToBarcodeCommand} = require('../src/zipcode-to-barcode-command');

class GoToZipcodeToBarcodePageCommand {
  runCommand() {
    return new CommandResponse({
      text: 'Please input zipcode',
      newMapping:{'*': new ZipcodeToBarcodeCommand()}
    })
  }
}

module.exports = GoToZipcodeToBarcodePageCommand;