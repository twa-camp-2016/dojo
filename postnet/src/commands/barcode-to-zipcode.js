let barcodetozipcodeTrans = require('../barcodetozipcodeTrans');
// module.exports = function (barcode) {
//     let zipcode = braCodeToZipCode(barcode);
//     if (zipcode === false) {
//         return {
//             error: 'Please give right input'
//         }
//     } else {
//         return {
//             text: zipcode,
//             reset: true
//         }
//     }
// };
let CommandResponse = require('../CommandResponse');

let barcodetozipcode = new barcodetozipcodeTrans();
class BarcodeToZipcode {
    run(barcode) {
        let zipcode = barcodetozipcode.run(barcode);
        if (zipcode.result === false) {
            return new CommandResponse({
                    error: 'Please give right input'
            });
        } else {
            return new CommandResponse({
                text: zipcode.result,
                reset: true
            });
        }
    }
}
module.exports = BarcodeToZipcode;