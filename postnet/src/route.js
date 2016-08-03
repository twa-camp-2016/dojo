let {
    prompt
} = require('../src/commands');

const flags = {
    '*':prompt
};

let mapping = flags;
function route(inputs) {
    let command = mapping[inputs]||mapping['*'];
    let response = command(inputs);
    if(response.newMapping){
        mapping = response.newMapping;
        return response.text
    }else if(response.reset){
        mapping = flags;
        return response.text
    }else if(response.error){
        return response.error

    }else {
        return response.text
    }

}


module.exports = {
    route
}

