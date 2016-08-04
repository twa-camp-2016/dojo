module.exports = function () {
    return {
        text: 'Please input zip code:',
        newMapping: {
            "*": require('../commands/zipcode-to-barcode')
        }
    }
};

