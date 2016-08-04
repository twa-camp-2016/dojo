let commandMainPage = require('../src/commands/goto-main-page');
const defaultMapping = {
    "*": commandMainPage
};

let mapping = defaultMapping;

function route(input) {
    let command = mapping[input] || mapping['*'];
    let response = command(input);
    if (response.error) {
        // console.log(response.error);
        // return {
        //     text: response.error
        // };
        console.log(response.error);
        return;
    }
    if (response.reset) {
        mapping = defaultMapping;
        // return {
        //     text: response.text,
        //     reset: true
        // };
        console.log(response.text);
        return;
    }
    if (response.newMapping) {

        mapping = response.newMapping;
        // return {
        //     text: response.text
        // };
        console.log(response.text);
        return;
    }
    // return {
    //     text: response.text
    // }
    console.log(response.text);
    return;
}

module.exports = route;

route('');
route('2');
route('|:::||::|:|::||::|::|:|:|::|:|:|');

route('');
route('1');
route('23056');