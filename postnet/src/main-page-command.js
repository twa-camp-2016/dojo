let {GoToZipcodeToBarcodePageCommand} = require('../src/zipcode-to-barcode-page-command');
let {GoToBarcodeToZipcodePageCommand} = require('../src/barcode-to-zipcode-page-commad');
let {ExitCommand} = require('../src/exit-command');
let {DealInvalidInputCommand} = require ('../src/deal-invail-input-command');
let {CommandResponse} = require('../src/command-response');

class GoToMainPageCommand{
  runCommand(){
    return new CommandResponse({
      text: `
      |1. Translate zip code to bar code
       |2. Translate bar code to zip code
       |3. Quit
       |Please input your choices(1~3)`,
      //stripMargin(),
      newMapping: {
        "1": new GoToZipcodeToBarcodePageCommand(),
        "2": new GoToBarcodeToZipcodePageCommand(),
        "3": new ExitCommand(),
        "*": new DealInvalidInputCommand()
      }
    })
  }
}

module.exports = GoToMainPageCommand;