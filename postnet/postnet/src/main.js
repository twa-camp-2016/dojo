'use strict';

let {Route} = require('../src/route');
var scanf = require('scanf');

while (1){
    let input = scanf('%s');
    let a = new Route();
    let menu = a.translate(input);
    console.log(menu);
}
