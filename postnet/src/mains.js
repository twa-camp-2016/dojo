// let readline = require('../src/route');
//
// let  rl = readline.createInterface(process.stdin, process.stdout);
//
// rl.setPrompt('Test> ');
// rl.prompt();
// while (1){
//     rl.on( 'line',readline());
// }
//
//
// rl.on('close', function() {
//     console.log('bye bye!');
//     process.exit(0);
// });
let scanf = require('scanf');

let {route} =require('../src/route');
let a = 0;
while (1) {
    let input = scanf('%s');
    let b = route(input);
    console.log('%s', b);
}
