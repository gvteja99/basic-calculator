function pressKey(e) {
    let kc = e.key;

    (kc === 'Enter')?kc='=':kc;
    let button = document.querySelector(`.button[data-key="${kc}"]`);
    if (button){
        actionButton(button)
        button.classList.add('pressed');        
    }
}

function releaseKey(e) {
    let kc = e.key;

    (kc === 'Enter')?kc='=':kc;
    let button = document.querySelector(`.button[data-key="${kc}"]`);
    if (button){
        button.classList.remove('pressed');
    }
}


function pressButton(e) {
    let button = e.srcElement;
    
    if('button' != button.classList[0]) {
        return
    }
    
    actionButton(button)
}

function actionButton(button) {

    let result = document.querySelector('.result');

    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(button.textContent)){
        if (result.textContent === '0') {
            result.textContent = button.textContent;
        } else {
            result.textContent += button.textContent;
        }
    } else if (button.textContent === 'CLEAR') {
        result.textContent = '0';
        numbers = [NaN, NaN];
        sign = NaN;
    } else if (button.textContent === 'DELETE') {
        result.textContent = result.textContent.slice(0, -1);
    } else if (button.textContent === '.' && (!result.textContent.includes(button.textContent))) {
        result.textContent += button.textContent;
    } else if (['+', '-', '×', '÷'].includes(button.textContent)) {
        sign = button.textContent;
        if (numbers[0]) {
            result.textContent = operate(numbers[0], +result.textContent, sign).toPrecision(9).toString();
            numbers[0] = +result.textContent;
        } else {
            numbers[0] = +result.textContent
            result.textContent = '0'
        }

    } else if (button.textContent === '=') {
        if (sign) {
            result.textContent = operate(numbers[0], +result.textContent, sign).toPrecision(9).toString();
            numbers[0] = NaN;
        }
    }

}



function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a*b
}

function divide(a, b) {
    if (b){
        return a/b
    } else {
        alert("You can't divide by 0")
        numbers = [NaN, NaN];
        sign = NaN;
        return 0
    }
}

function operate(a, b, sign) {
    
    return sign==='+'?add(a,b):
    sign==='-'?subtract(a,b):
    sign==='÷'?divide(a,b):multiply(a,b);
}

window.addEventListener('keydown', pressKey);
window.addEventListener('keyup', releaseKey);
window.addEventListener("click", pressButton);

let sign = NaN;
let numbers = [NaN, NaN];