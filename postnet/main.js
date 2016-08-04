let scanf = require('scanf');
let {route} = require('./src/route.js');

while(1){
  let input = scanf('%s');
  let result = route(input);
  console.log(result.text);

}



