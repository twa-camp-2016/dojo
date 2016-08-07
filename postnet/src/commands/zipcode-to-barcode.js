let zipcodetobarcodeTrans = require('../zipcodetobarcodeTrans');
// module.exports = function (zipcode) {
//     let barcode = zipCodeToBarCode(zipcode);
//
//     if (barcode === false) {
//         return {
//             error: 'Please give right input',
//         }
//     } else {
//         return {
//             text: barcode,
//             reset: true
//         }
//     }
// };
let translater = new zipcodetobarcodeTrans();
let CommandResponse = require('../CommandResponse');
class ZipcodeToBarcode {
     run(zipcode){
         let barcode = translater.run(zipcode);
         // console.log(barcode);
         // console.log(barcode.result)
         if (barcode.result === false) {
             return new CommandResponse({
                 error: 'Please give right input',
             });
         } else {
             return new CommandResponse({
                 text: barcode.result,
                 reset: true
             });
         }
     }
}
module.exports = ZipcodeToBarcode;
