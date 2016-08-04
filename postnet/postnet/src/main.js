'use strict';

let {route} = require('../src/route');
var scanf = require('scanf');

while (1){
    let input = scanf('%s');
    let menu = route(input);
    console.log(menu);
}
