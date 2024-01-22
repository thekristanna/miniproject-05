document.addEventListener('DOMContentLoaded', function () {
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let display = ''; 

    const output = document.getElementById('output');

    function updateDisplay(value) {
        if (value.length > 10) {
            let num = parseFloat(value);
            if (!isNaN(num)) {
                let fixedLength = 10 - Math.min(Math.floor(num).toString().length, 10);
                value = num.toFixed(fixedLength).toString();
            }
            value = value.substring(0, 10);
        }
        output.textContent = value;
    }

    function handleNumber(number) {
        if (currentInput.length < 10) {
            currentInput += number;
            display += number; 
            updateDisplay(display);
        }
    }

    function handleOperator(op) {
        if (!operator && currentInput) {
            previousInput = currentInput;
            currentInput = '';
            operator = op;
            display += ' ' + op + ' '; 
            updateDisplay(display);
        }
    }

    function toggleSign() {
        if (currentInput) {
            if (currentInput.startsWith('-')) {
                currentInput = currentInput.substring(1);
                display = display.substring(0, display.lastIndexOf('-')) + currentInput; 
            } else {
                currentInput = '-' + currentInput;
                if (previousInput && operator) {
                    display = previousInput + ' ' + operator + ' -' + currentInput; 
                } else {
                    display = '-' + display; 
                }
            }
            updateDisplay(display);
        }
    }

    function handlePercent() {
        if (currentInput !== '') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            display = currentInput;
            updateDisplay(display);
        }
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            display += '.'; 
            updateDisplay(display);
        }
    }

    function calculate() {
        if (operator && previousInput) {
            let result = 0;
            switch (operator) {
                case '+':
                    result = parseFloat(previousInput) + parseFloat(currentInput);
                    break;
                case '-':
                    result = parseFloat(previousInput) - parseFloat(currentInput);
                    break;
                case '×':
                    result = parseFloat(previousInput) * parseFloat(currentInput);
                    break;
                case '÷':
                    if (parseFloat(currentInput) === 0) {
                        updateDisplay('Error');
                        return;
                    }
                    result = parseFloat(previousInput) / parseFloat(currentInput);
                    break;
            }
            display = result.toString(); 
            updateDisplay(result.toString());
            currentInput = result.toString();
            operator = null;
        }
    }

    const buttons = document.querySelectorAll('.calculator');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.id === 'ac') {
                currentInput = '';
                operator = null;
                previousInput = '';
                display = ''; 
                updateDisplay('0');
            } else if (this.id === 'sign') {
                toggleSign();
            } else if (this.id === 'percent') {
                handlePercent();
            } else if (this.id === 'dot') {
                handleDecimal();
            } else if (this.id === 'equals') {
                calculate();
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(this.id)) {
                handleOperator(this.textContent);
            } else if (!isNaN(parseInt(this.textContent))) {
                handleNumber(this.textContent);
            }
        });
    });
});
