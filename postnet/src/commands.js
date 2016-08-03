let {zipcodeToBarcode, barcodeToZipcode} = require('../src/postnet.js');
let {stripMargin} = require('stripmargin');
function commandMainPage() {
  return {
    text: `
      |1. Translate zip code to bar code
       |2. Translate bar code to zip code
       |3. Quit
       |Please input your choices(1~3)`,
    //stripMargin(),
    newMapping: {
      "1": commandZipcodeToBarcodePage,
      "2": commandBarcodeToZipcodePage,
      "3": commandExit,
      "*": commandInvalidInput
    }
  }
}

function commandZipcodeToBarcodePage() {
  return {
    text: 'Please input zipcode',
    newMapping: {
      '*': commandZipcodeToBarcode
    }
  }
}

function commandZipcodeToBarcode(inpute) {
  let barcode = zipcodeToBarcode(inpute);
  if (barcode.type === true) {
    return {
      text: barcode.code,
      reset: true
    }
  }else{
    return{
      error: 'Please input correct zipcode:',
    }
  }
}

function commandBarcodeToZipcodePage() {
  return{
    text: 'Please input barcode',
    newMapping:{
      '*': commandBarcodeToZipcode
    }
  }
}

function commandBarcodeToZipcode(input) {
  let zipcode = barcodeToZipcode(input);
  if(zipcode.type === true){
    return{
      text: zipcode.code,
      reset: true
    }
  }else{
    return{
      error: 'Please input correct barcode:',
    }
  }
}

function commandExit() {
    process.exit();
}

function commandInvalidInput() {
  return{
    error: 'Please input correct option:',
  }
}

module.exports = {
  commandMainPage,
  commandZipcodeToBarcodePage,
  commandZipcodeToBarcode,
  commandBarcodeToZipcodePage,
  commandBarcodeToZipcode,
  commandExit,
  commandInvalidInput
};
