let _ = require('lodash');
let {loadBarcodeList} = require('../src/loadBarcodeTable.js');
let barcodeList = loadBarcodeList();

function zipcodeToBarcode(zipcode) {
  let correctZipcode = checkZipCode(zipcode);
  console.log(correctZipcode);
  if (correctZipcode.type === true) {
    let formattedZipcode = formatZipCode(correctZipcode);
    let checkedCD = addCheckCD(formattedZipcode);
    return trans2Barcode(checkedCD, barcodeList);
  }
  else {
    return {type: false, code: zipcode};
  }
}

function barcodeToZipcode(barcode) {
  let formattedBarcode = formatBarcode(barcode);
  if (formattedBarcode.type === true) {
    let zipcode = trans2Zipcode(formattedBarcode.code, barcodeList);
    return checkCD(zipcode);
  } else {
    return {
      type: false,
      code: barcode
    }
  }
}

function checkZipCode(zipcode) {

  let zipcodeArray = zipcode.split("");
  let position = _.indexOf(zipcode, "-");
  let reverseZipcodeString = _.reverse(zipcodeArray).toString;
  let reversePosition = _.indexOf(reverseZipcodeString, "-");
  let numberZipcodeArray = _.map(zipcodeArray, x => parseInt(x));

  if (zipcodeArray.length !== 5 && zipcodeArray.length !== 9 && zipcodeArray.length !== 10) {
    return {type: false, code: zipcode};
  }
  else if (zipcodeArray.length === 10 && position !== reversePosition && position !== -1) {
    return {type: false, code: zipcode};
  }
  else if (zipcodeArray.length === 5 && position !== -1) {
    return {type: false, code: zipcode};
  }
  else if (zipcodeArray.length === 9 && position !== -1) {
    return {type: false, code: zipcode};
  }

  else if (zipcodeArray.length === 10 && position !== 5) {
    return {type: false, code: zipcode};
  }
  else if (numberZipcodeArray.includes(NaN)) {
    return {type: false, code: zipcode};
  }
  else {
    return {type: true, code: zipcode};
  }
}
function formatZipCode(correctZipCode) {
  let zipCodeArray = correctZipCode.code.split('');
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
  let checkCD = 10 - _.sum(formattedZipCode) % 10;
  return _.concat(formattedZipCode, checkCD);
}
function trans2Barcode(checkedCD, barcodeList) {
  let beforeBarcode = _.map(checkedCD, item => {
    return barcodeList[(item)];
  });
  return {type: true, code: _(beforeBarcode).join('')}
}

function formatBarcode(barcode) {console.log(barcode);
  let temp = barcode.split('');
  if (temp.length !== 32 && temp.length !== 52) {
    return {type: false, code: barcode};
  }
  else if (temp.length === 32 || temp.length === 52) {
    return {
      type: true,
      code: _.chain(barcode)
        .split('')
        .drop()
        .dropRight()
        .chunk(5)
        .map(x => x.join(''))
        .value()
    }
  }
}
function trans2Zipcode(formattedBarcode, barcodeList) {
  let beforeZipcode = _.map(formattedBarcode, function (formattedBarcode) {
    return _.indexOf(barcodeList, formattedBarcode);
  });console.log(beforeZipcode);
  let tag = _.map(formattedBarcode, barcode => {
    return !!barcodeList.includes(barcode);
  });
  if (tag.includes(false)) {
    return {type: false, code: formattedBarcode};
  }
  else {
    return _(beforeZipcode.join(''));
  }

}

function checkCD(zipcode) {console.log(zipcode);
  let zipcodeArray = zipcode.split('');
  let checkCD = _.chain(zipcodeArray)
    .map(x => parseInt(x))
    .last()
    .value();
  let correctCHeckCD = 10 - _.sum(zipcodeArray) % 10;
  if (checkCD === correctCHeckCD) {
    if (zipcodeArray.length === 10) {
      zipcodeArray.splice(5, 0, '-');
    }
    return {type: true, code: _.dropRight(zipcodeArray).join('')};
  }
  else {
    return {type: false, code: zipcode};
  }
}

module.exports = {
  checkZipCode,
  formatZipCode,
  addCheckCD,
  trans2Barcode,
  formatBarcode,
  trans2Zipcode,
  checkCD,
  zipcodeToBarcode,
  barcodeToZipcode
};
