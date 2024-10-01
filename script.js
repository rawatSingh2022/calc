const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.getElementById('display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.value;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.value = keyContent;
            } else {
                display.value = displayedNum + keyContent;
            }
        }

        if (action === 'decimal') {
            display.value = displayedNum + '.';
        }

        if (action === 'clear') {
            display.value = '';
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
        }

        if (action === 'delete') {
            display.value = displayedNum.slice(0, -1);
        }

        if (action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide') {

            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if (action === 'equals') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            display.value = calculate(firstValue, operator, secondValue);
        }
    }
});

const calculate = (n1, operator, n2) => {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}
