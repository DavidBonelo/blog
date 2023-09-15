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

function backspace() {
  if (!operator && firstOperand) {
    firstOperand = firstOperand.slice(0, -1);
  } else if (secondOperand) {
    secondOperand = secondOperand.slice(0, -1);
  } else {
    return;
  }
  display.innerText = display.innerText.slice(0, -1);
}

function handleNumKey(keyValue) {
  if (keyValue === ".") {
    periodButton.disabled = true;
    if (!firstOperand) firstOperand = "0";
    else if (!secondOperand && operator) secondOperand = "0";
  }
  if (!operator) {
    firstOperand = firstOperand ? firstOperand + keyValue : keyValue;
    display.innerText = firstOperand;
  } else {
    secondOperand = secondOperand ? secondOperand + keyValue : keyValue;
    display.innerText = secondOperand;
  }
  console.log({ firstOperand, operator, secondOperand, prevAnswer });
}

function isOperator(keyValue) {
  return ["+", "-", "x", "÷"].includes(keyValue);
}

function handleFunKey(keyValue) {
  switch (keyValue) {
    case "C":
      clear();
      break;
    case "=":
      if (operator != null && firstOperand != null && secondOperand != null)
        operate(operator, firstOperand, secondOperand);
      break;
    case "⌫":
      backspace();
      break;
    default: // presses an operation
      if (!isOperator(keyValue)) return;

      if (operator != null && firstOperand != null && secondOperand != null) {
        operate(operator, firstOperand, secondOperand);
      }
      if (!firstOperand) {
        firstOperand = prevAnswer ?? 0;
      }
      operator = keyValue;
      break;
  }
  console.log({ firstOperand, operator, secondOperand, prevAnswer });
}

const numButtons = document.querySelectorAll(".num-btn");
numButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    handleNumKey(value);
  })
);

const funButtons = document.querySelectorAll(".fun-btn");
funButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    handleFunKey(value);
  })
);

const periodButton = document.getElementById("period-btn");
const displayObserver = new MutationObserver((_, __) => {
  periodButton.disabled = display.innerText.includes(".") ? true : false;
});

displayObserver.observe(display, { childList: true });

window.addEventListener("keydown", (e) => {
  let keyValue = e.key;
  console.log(keyValue);
  if (!isNaN(keyValue) || keyValue == ".") {
    handleNumKey(keyValue);
  } else {
    if (keyValue == "/") e.preventDefault();
    if (keyValue == "Enter") e.preventDefault();
    keyValue = keyValue.replace("/", "÷");
    keyValue = keyValue.replace("*", "x");
    keyValue = keyValue.replace("Enter", "=");
    handleFunKey(keyValue);
  }
});
