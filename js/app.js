let calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperandActive: false,
    operator: null,
    quant: 0,
}

const updateDisplay = () => {
    const screen = document.querySelector('.screen');
    screen.value = calculator.displayValue;
}

const inputNumber = (number) => {
    const { displayValue, secondOperandActive, firstOperand } = calculator;


    if (secondOperandActive) {
        calculator.displayValue = number
        calculator.secondOperandActive = false
        console.log(calculator.displayValue);
    } else {
        calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    }

    console.log(calculator);
    // console.log(calculator.displayValue);
}



const inputDecimal = (decimal) => {
    const { displayValue, secondOperandActive, operator } = calculator;

    if (secondOperandActive && operator) return

    if (!displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    }
    console.log(calculator);
}

const inputOperator = (nextOperator) => {
    const { value } = nextOperator;
    const { displayValue, firstOperand, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    console.log(value);
    // if (!operator.matches('checkedOperator')) {
    //     operator.classList.toggle('checkedOperator')
    // }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.secondOperandActive = true;
    calculator.operator = value;
    console.log(calculator);
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
}

const btnClearAll = document.querySelector('.all-clear');

const handleAllClear = (clear) => {

    calculator = {
        displayValue: '0',
        firstOperand: null,
        secondOperandActive: false,
        operator: null,
    }

}

const handleClearItem = (val) => {
    const { displayValue, quant } = calculator;
    const length = displayValue.length;

    if (displayValue.length > 1) {
        const newDisplayValue = displayValue.substring(0, length - 1)

        calculator.displayValue = newDisplayValue
        updateDisplay()
    }

    if (displayValue.length == 1) {
        calculator.displayValue = '0';
    }

}

const inputValue = document.querySelector('.calculator');

const handleButton = (e) => {
    const { target } = e;

    if (!target.matches('button')) {
        return;
    }

    if (target.matches('.btn-number')) {
        inputNumber(target.value)
        updateDisplay();
    }

    if (target.matches('.decimal')) {
        inputDecimal(target.value);
        updateDisplay();
    }

    if (target.matches('.operator')) {
        inputOperator(target)
        updateDisplay();
    }

    if (target.matches('.all-clear')) {
        handleAllClear(target);
        updateDisplay();
    }

    if (target.matches('.clear-item')) {
        handleClearItem(target.value)
    }

    updateDisplay();

}

inputValue.addEventListener('click', handleButton);


/**
 *
 * 1. When the user finishes entering the first operand and hits an operator
 * 2. When the user finishes the second operand and hits an operator
 * 3. When a user enters two or more operators consecutively
 *
 */