'use strict';

const buttons = document.querySelectorAll('.btn');
const uiOperation = document.querySelector('.ui-operation');
const uiInput = document.querySelector('.ui-input');

const regex = new RegExp('[+-÷×]');

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return Number(a) + Number(b);
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return a / b;
  }
}

let isOldNumb = false;
let twoNumbEntered = false;
let a;
let b;
let operator;

buttons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.classList.contains('btn-number')) {
      if (uiInput.textContent === '0') {
        uiInput.textContent = btn.textContent;
      } else {
        if (regex.test(uiOperation.textContent)) {
          if (isOldNumb) {
            uiInput.textContent = btn.textContent;
            isOldNumb = false;
            twoNumbEntered = true;
          } else {
            uiInput.textContent += btn.textContent;
          }
        } else {
          uiInput.textContent += btn.textContent;
        }
      }
    } else if (btn.classList.contains('btn-operator')) {
      a = uiOperation.textContent.split(' ')[0];
      b = uiInput.textContent;
      operator = uiOperation.textContent.split(' ')[1];

      if (!regex.test(uiOperation.textContent)) {
        uiOperation.textContent = uiInput.textContent + ' ' + btn.textContent;
        isOldNumb = true;
      } else if (regex.test(uiOperation.textContent) && !twoNumbEntered) {
        if (!uiOperation.textContent.includes('=')) {
          uiOperation.textContent =
            uiOperation.textContent.slice(0, -1) + btn.textContent;
        } else {
          if (!(btn.textContent === '=')) {
            uiOperation.textContent =
              uiInput.textContent + ' ' + btn.textContent;
          }
        }
      } else if (regex.test(uiOperation.textContent)) {
        if (btn.textContent === '=') {
          uiOperation.textContent += ' ' + b + '  =';
        } else {
          uiOperation.textContent =
            operate(operator, a, b) + ' ' + btn.textContent;
        }
        uiInput.textContent = operate(operator, a, b);
        twoNumbEntered = false;
        isOldNumb = true;
      }
    } else if (btn.classList.contains('btn-dot')) {
      if (!uiInput.textContent.includes('.'))
        uiInput.textContent += btn.textContent;
    } else if (btn.classList.contains('btn-sqrt')) {
      let x = uiInput.textContent;
      uiOperation.textContent = Math.sqrt(x);
      uiInput.textContent = Math.sqrt(x);
    } else if (btn.classList.contains('btn-pow')) {
      let x = uiInput.textContent;
      uiOperation.textContent = Math.pow(x, 2);
      uiInput.textContent = Math.pow(x, 2);
    } else if (btn.classList.contains('btn-clear')) {
      uiOperation.textContent = '';
      uiInput.textContent = 0;
    } else if (btn.classList.contains('btn-del')) {
      if (uiInput.textContent.length === 1) {
        uiInput.textContent = 0;
      } else if (uiInput.textContent !== '0') {
        uiInput.textContent = uiInput.textContent.slice(0, -1);
      }
    }
  });
});
