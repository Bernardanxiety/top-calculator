const buttons = document.querySelectorAll(".grid-item");
const current = document.querySelector(".current");
// const previous = document.querySelector(".current::after");

let currentNumber = 0;
let previousNumber = 0;
let operand;
let toDo;

const add = (a, b) => a + b;
const substract = (a, b) => a - b;

const equal = (a, b) => {
  if (previousNumber === 0) {
    previousNumber = Number(current.textContent.replace(",", "."));
    current.setAttribute("content", `${previousNumber} =`);
  } else {
    currentNumber = Number(current.textContent.replace(",", "."));
    current.setAttribute(
      "content",
      `${previousNumber} ${operand} ${currentNumber}`
    );
    current.textContent = operations[toDo](previousNumber, currentNumber);
    toDo = undefined;
  }
};
const digitAdd = (e) => (current.textContent += e.target.id);
const remove = (e) =>
  (current.textContent = current.textContent.slice(
    0,
    current.textContent.length - 1
  ));
const decimal = (e) => {
  if (!current.textContent.includes(",")) {
    current.textContent += ",";
  }
};
const clearCurrent = (e) => (current.textContent = "0");
const clear = (e) => {
  operand = undefined;
  currentNumber = 0;
  previousNumber = 0;
  toDo = undefined;
  current.textContent = currentNumber;
  current.setAttribute("content", "");
};
const multiply = (a, b) => a * b;
const divideByNumber = () => {
  current.textContent = (1 / (current.textContent * 1)).replace(".", ",");
};
const percentage = () => {
  current.textContent = (current.textContent.replace(",", ".") * 1) / 100;
};

const sqrt = () => {
  current.textContent = Math.sqrt(current.textContent.replace(",", ".") * 1);
};

const root = () =>
  (current.textContent =
    current.textContent.replace(",", ".") *
    1 *
    (current.textContent.replace(",", ".") * 1));

const minus = () =>
  (current.textContent = current.textContent.replace(",", ",") * 1 * -1);

const operations = {
  add: add,
  digit: digitAdd,
  remove: remove,
  decimal: decimal,
  CE: clearCurrent,
  C: clear,
  substract: substract,
  equal: equal,
  multiply: multiply,
  divideByNumber: divideByNumber,
  percentage: percentage,
  sqrt: sqrt,
  root: root,
  minus: minus,
};

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let attr = e.target.getAttribute("data-type");
    switch (attr) {
      case "digit":
        if (current.textContent === "0") {
          current.textContent = "";
          operations[attr](e);
        } else {
          operations[attr](e);
        }
        break;
      case "operator":
        if (previousNumber === 0) {
          previousNumber = Number(current.textContent.replace(",", "."));
          toDo = e.target.id;
          current.setAttribute(
            "content",
            `${previousNumber} ${e.target.textContent}`
          );
          current.textContent = "0";
        } else if (toDo === undefined) {
          previousNumber = Number(current.textContent.replace(",", "."));
          current.textContent = "0";
          current.setAttribute(
            "content",
            `${previousNumber} ${e.target.textContent}`
          );
          toDo = e.target.id;
        } else {
          currentNumber = Number(current.textContent.replace(",", "."));
          previousNumber = operations[toDo](previousNumber, currentNumber);
          current.textContent = "0";

          toDo = e.target.id;
          current.setAttribute(
            "content",
            `${previousNumber} ${e.target.textContent}`
          );
        }
        operand = e.target.textContent;
        console.log(operations[e.target.id]);
        break;
      case "minor":
        console.log(operations[e.target.id]);
        operations[e.target.id](e);
    }
    current.textContent = current.textContent.toString().replace(".", ",");
  })
);

window.onload = () => {
  current.textContent = currentNumber;
};
