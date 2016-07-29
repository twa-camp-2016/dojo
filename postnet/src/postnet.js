let _ = require('lodash');
let {barcodeTable} = require('../src/loadBarcodeTable.js');

function formatZipCode(correctZipCode) {
    let zipCodeArray = correctZipCode.split('');
    if (zipCodeArray.length === 10) {

        return _.chain(zipCodeArray)
            .difference(['-'])
            .map(x =>parseInt(x))
            .value();
    }
    else return _.chain(zipCodeArray)
        .map(x =>parseInt(x))
        .value();
}
function addCheckCD(formattedZipCode) {
    let checkCD = 10 - _.sum(formattedZipCode)%10;
    return _.concat(formattedZipCode,checkCD);

}

function trans2Barcode(checkCDZipCode,barcodeList) {
  let beforeBarcode = _.map(checkCDZipCode,function (checkCDZipCode){
      return barcodeList[checkCDZipCode];
  });
    return {type: true,code: _(beforeBarcode).join('')}
}

module.exports = {
    //checkZipCode: checkZipCode,
    formatZipCode: formatZipCode,
    addCheckCD: addCheckCD,
    trans2Barcode: trans2Barcode
};
