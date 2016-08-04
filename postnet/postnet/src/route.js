let {
    GoToMenu,
        GoToZipCodePageCommand,
        GoToBarCodePageCommand,
        GoToQuitPageCommand,
        GoToDealErrorPageCommand,
        GetBarCode,
        GetZipCode
} = require('../src/command');

let defualtMainMenu = {'nextGoto': GoToMenu};
let mainMenu = defualtMainMenu;

class Route {

    translate(input) {

        let a = mainMenu[`menu${input}`] || mainMenu['nextGoto'];
        let t = new a;
        let tempMainmenu = t.translate(input);

        if (tempMainmenu.mainMenu) {
            mainMenu = tempMainmenu.mainMenu;

            return tempMainmenu.menu;
        }
        if (tempMainmenu.reset) {
            mainMenu = defualtMainMenu;

            return tempMainmenu.menu;
        }
        if (tempMainmenu.error) {
            return tempMainmenu.error;
        }
    }
}


module.exports = {Route};