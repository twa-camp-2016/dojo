let {BarcodeToZipcodeCommand} = require('../src/barcode-to-zipcode-command');
let {CommandResponse} = require('../src/command-response');

class GoToBarcodeToZipcodePageCommand {
  runCommand() {
    return new CommandResponse({
      text: 'Please input barcode',
      newMapping: {
        '*':new BarcodeToZipcodeCommand
      }
    })
  }
}

module.exports = GoToBarcodeToZipcodePageCommand;