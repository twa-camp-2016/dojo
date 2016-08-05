// module.exports = function () {
//     return {
//         text: 'Please input bar code:',
//         newMapping: {
//             "*": require('../commands/barcode-to-zipcode')
//         }
//     };
// };

let BarcodeToZipcodeCommand = require('./barcode-to-zipcode');
let CommandResponse = require('../CommandResponse');

class GotoBarToZipPage {
    constructor() {
        return new CommandResponse({
            text: 'Please input bar code:',
            newMapping: {
                "*": new BarcodeToZipcodeCommand()
            }
        });
    }
}
module.exports = GotoBarToZipPage;