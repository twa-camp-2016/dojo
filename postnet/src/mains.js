// let route = require('./route');
//
// function mains() {
//     console.log(route().text);
//     process.stdin.setEncoding('utf8');
//     process.stdin.on('data', (input) => {
//         let result = route(input.trim());
//
//         console.log(result.text);
//         if (result.reset) {
//             console.log(route().text);
//         }
//     });
// }
//
// mains();
//
// module.exports = mains;

let Route = require('./route');

const route = new Route;

function mains() {
    let response = route.constructor(input);
    console.log(response.text);
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (input) => {
        let result = route.handle(input.trim());

        console.log(result.text);
        if (result.reset) {
            console.log(result.text);
        }
    });
}

mains();

module.exports = mains;

