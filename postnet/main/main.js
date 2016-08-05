'use strict';
var scanf = require('scanf');
let Route = require('../main/route');

let route = new Route();

while (1) {
    var input = scanf('%s');
    let answer = route.handle(input);
    console.log(answer.text);
}
