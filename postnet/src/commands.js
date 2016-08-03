let {
    buildJudgeExecuteZipcode,
    buildJudgeExecuteBarcode
} = require('../src/main');

function prompt() {
    let lines = ['According to need to choose option'];
    lines.push('1.zipcode to barcode');
    lines.push('2.barcode to zipcode');
    lines.push('3.quit');
    let reminder = lines.join('\n');
    return {
        text:reminder,
        newMapping:{
            '1':goToBarcodePage,
            '2':goToZipcodePage,
            '3':goToQuit,
            '*':other
        }
    }
}

function goToBarcodePage(zipcode) {
    return {
        text:'please input zipcode!',
        newMapping:{
            '*':zipcodeToBarcode
        }
    }
}


function goToZipcodePage() {
    return {
        text:'please input barcode!',
        newMapping:{
            '*':barcodeToZipcode
        }
    }
}

function goToQuit() {
    return {
        text:'welcome next',
        newMapping:{
            '*':prompt
        }
    }
}


function other() {
    return {
        error: 'please give right input '

    }

}

function zipcodeToBarcode(zipcode) {
    let result = buildJudgeExecuteZipcode(zipcode);
    if(result === 'please enter the correct barcode!'){
        return {
            error:result
        }
    }else {
        return{
            text:result,
            reset:true
        }
    }
}

function barcodeToZipcode(barcode) {
    let result = buildJudgeExecuteBarcode(barcode);
    if(result === 'please enter the correct barcode!'){
        return{
            error:result
        }
    }else {
        return{
            text:result,
            reset:true
        }
    }
}

module.exports = {
    prompt,
    goToBarcodePage,
    goToZipcodePage,
    goToQuit,
    other
}