'use strict';

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let resetInput = false;

const historyScreen = document.querySelector('.ui-history');
const inputScreen = document.querySelector('.ui-input');
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.querySelector('.btn-equal');
const deleteButton = document.querySelector('.btn-delete');
const clearButton = document.querySelector('.btn-clear');
const pointButton = document.querySelector('.btn-point');

window.addEventListener('keydown', insertKeyboardInput);
equalsButton.addEventListener('click', equals);
clearButton.addEventListener('click', clearScreen);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);

numberButtons.forEach(function (btn) {
  btn.addEventListener('click', () => appendNumber(btn.textContent)); // try e
});

operatorButtons.forEach(function (btn) {
  btn.addEventListener('click', () => setOperation(btn.textContent));
});

function setOperation(operator) {
  // If there is a point at the end of the number, remove it
  if (inputScreen.textContent.endsWith('.'))
    inputScreen.textContent = inputScreen.textContent.slice(0, -1);

  // Enter first operand and operator to history screen
  if (currentOperation === null) {
    historyScreen.textContent = `${inputScreen.textContent} ${operator}`;

    // Change Operator Sign
  } else if (inputScreen.textContent === '' && currentOperation !== null) {
    historyScreen.textContent =
      historyScreen.textContent.slice(0, -1) + operator;

    // Calculate Operation
  } else {
    firstOperand = historyScreen.textContent.split(' ')[0];
    secondOperand = inputScreen.textContent;

    historyScreen.textContent =
      operate(currentOperation, firstOperand, secondOperand) + ' ' + operator;
  }
  currentOperation = operator;
  inputScreen.textContent = '';
}

function equals() {
  if (currentOperation !== null && inputScreen.textContent !== '') {
    firstOperand = historyScreen.textContent.split(' ')[0];
    secondOperand = inputScreen.textContent;

    historyScreen.textContent += ` ${inputScreen.textContent} =`;

    inputScreen.textContent = operate(
      currentOperation,
      firstOperand,
      secondOperand
    );
    resetInput = true;
    currentOperation = null;
  }
}

function appendNumber(number) {
  if (inputScreen.textContent === '0') {
    inputScreen.textContent = number;
  } else if (resetInput) {
    inputScreen.textContent = number;
    historyScreen.textContent = '';
    resetInput = false;
  } else {
    inputScreen.textContent += number;
  }
}

function clearScreen() {
  historyScreen.textContent = '';
  inputScreen.textContent = 0;
  currentOperation = null;
}

function deleteNumber() {
  if (inputScreen.textContent.length === 1) {
    inputScreen.textContent = 0;
  } else if (inputScreen.textContent !== '0') {
    inputScreen.textContent = inputScreen.textContent.slice(0, -1);
  }
}

function appendPoint() {
  if (resetInput) return;
  if (!inputScreen.textContent.includes('.') && inputScreen.textContent !== '')
    inputScreen.textContent += '.';
}

function insertKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === 'Backspace') deleteNumber();
  if (e.key === 'Enter' || e.key === '=') equals();
  if (e.key === 'Escape') clearScreen();
  if (
    e.key === '+' ||
    e.key === '-' ||
    e.key === '*' ||
    e.key === '/' ||
    e.key === '^'
  )
    setOperation(e.key);
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
    case '*':
      return a * b;
    case '÷':
    case '/':
      if (b === 0) {
        resetInput = true;
        return 'How dare you!!!';
      }
      return a / b;
    case '√':
      return Math.pow(a, 1 / b);
    case '^':
      return Math.pow(a, b);
  }
}
