let {
    goToMenu,
    // goToZipCodePageCommand,
    // goToBarCodePageCommand,
    // goToQuitPageCommand,
    // goToDealErrorPageCommand,
    // getBarcode,
    // getZipCode
} = require('../src/command');

let defualtMainMenu = {'nextGoto': goToMenu};
let mainMenu = defualtMainMenu;
    function route(input) {

    let a = mainMenu[`menu${input}`] || mainMenu['nextGoto'];

    let tempMainmenu = a(input);

    if(tempMainmenu.mainMenu){
        mainMenu = tempMainmenu.mainMenu;

        return tempMainmenu.menu;
    }
    if(tempMainmenu.reset){
        mainMenu = defualtMainMenu;

        return tempMainmenu.menu;
    }
    if(tempMainmenu.error){
        return tempMainmenu.error;
    }

}

module.exports = {route};
