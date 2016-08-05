let { GoToMainPageCommand,} = require('../src/commands.js');

const defaultMapping = {
  '*': new GoToMainPageCommand()
};

class Route{
  constructor(){
    this.mapping = defaultMapping;
  }
  route(input){
    let command = this.mapping[input] || this.mapping["*"];
    let response = ZipcodeToBarcodeCommand.runCommand(input);

    if (response.error) {
      return new RoteResponse({
        text: response.error
      });
    }

    if (response.reset) {
      this.mapping = defaultMapping;
      return new RoteResponse({
        text: response.text,
        rerun: true
      });
    }

    if (response.newMapping) {
      this.mapping = response.newMapping;
      return new RoteResponse({
        text: response.text
      });
    }

    return new RoteResponse({
      text: response.text
    });
  }
}

module.exports = Route;