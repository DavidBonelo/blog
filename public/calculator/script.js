let firstOperand = null;
let operator = null;
let secondOperand = null;
let prevAnswer = null;
const display = document.getElementById("display");

function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 == 0) {
    alert("wait, that's ilegal, you can't divide by zero!");
    return 0;
  }
  return num1 / num2;
}

function clear() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  prevAnswer = null;
  display.innerText = "0";
}

function operate(operation, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  let result;
  switch (operation) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "x":
      result = multiply(num1, num2);
      break;
    case "÷":
      result = divide(num1, num2);
      break;

    default:
      break;
  }
  clear();
  prevAnswer = result;
  display.innerText = round(result, 4);
}

function round(number, precision) {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
}

const numButtons = document.querySelectorAll(".num-btn");
numButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    if (!operator) {
      firstOperand = firstOperand ? firstOperand + value : value;
      display.innerText = firstOperand;
    } else {
      secondOperand = secondOperand ? secondOperand + value : value;
      display.innerText = secondOperand;
    }
    console.log({ firstOperand, operator, secondOperand, prevAnswer });
  })
);

const funButtons = document.querySelectorAll(".fun-btn");
funButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    switch (value) {
      case "C":
        clear();
        break;
      case "=":
        if (operator != null && firstOperand != null && secondOperand != null)
          operate(operator, firstOperand, secondOperand);
        break;

      default: // presses an operation
        if (operator != null && firstOperand != null && secondOperand != null) {
          operate(operator, firstOperand, secondOperand);
        }
        if (!firstOperand) {
          firstOperand = prevAnswer ?? 0;
        }
        operator = value;
        break;
    }
    console.log({ firstOperand, operator, secondOperand, prevAnswer });
  })
);
