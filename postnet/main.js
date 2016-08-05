let scanf = require('scanf');
let {Route} = require('./src/route-class.js');

//const input = scanf('%s');
const route = new Route;
//console.log(route.route().text);
while(1){
  let input = scanf('%s');

  sendToRoute(input);
  function sendToRoute(input) {
    let response = route.route(input);
    console.log(response.text);
    if(response.rerun){
      sendToRoute(input);
    }
  }


}


