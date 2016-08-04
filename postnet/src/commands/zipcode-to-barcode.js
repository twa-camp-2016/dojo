let {zipCodeToBarCode} = require('../main');

module.exports = function (zipcode) {
    let barcode = zipCodeToBarCode(zipcode);

    if (barcode === false) {
        return {
            error: 'Please give right input',
        }
    } else {
        return {
            text: barcode,
            reset: true
        }
    }
};
