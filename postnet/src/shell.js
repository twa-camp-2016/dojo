let scanf = require('scanf');
let {route} = require('./route');

let a = 0;
for(let i = 1;i>0;){
    let input = scanf('%s');
    let aaa = route(input);
    console.log('%s', aaa);

}

