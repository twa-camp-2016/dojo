// module.exports = function () {
//     return {
//         text: 'Please input zip code:',
//         newMapping: {
//             "*": require('../commands/zipcode-to-barcode')
//         }
//     }
// };

let ZipcodeToBrcodeCommand = require('./zipcode-to-barcode');
let CommandResponse = require('../CommandResponse');
class GotoZiptoBarPage {
    constructor() {
        return new CommandResponse({
            text: 'Please input zip code:',
            newMapping: {
                "*": new ZipcodeToBrcodeCommand()
            }
        });
    }
}
module.exports=  GotoZiptoBarPage;