module.exports = function () {
    return {
        text: 'Please input bar code:',
        newMapping: {
            "*": require('../commands/barcode-to-zipcode')
        }
    };
};