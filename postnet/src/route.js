let { commandMainPage,} = require('../src/commands.js');

const defaultMapping = {
  '*': commandMainPage
};

let mapping = defaultMapping;
function route(input) {
  let command = mapping[input] || mapping["*"];
  let response = command(input);

  if (response.error) {
    return {
      text: response.error
    };
  }

  if (response.reset) {
    mapping = defaultMapping;
    return {
      text: response.text,
      rerun: true
    };
  }

  if (response.newMapping) {
    mapping = response.newMapping;
    return {
      text: response.text
    };
  }

  return {
    text: response.text
  }
}

module.exports = {
  route
};
