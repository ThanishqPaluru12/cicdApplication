function calculate(a, b, operation) {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return a / b;
    default:
      throw new Error("Unsupported operation.");
  }
}

const form = document.getElementById("calc-form");
const firstInput = document.getElementById("first");
const secondInput = document.getElementById("second");
const operationInput = document.getElementById("operation");
const resultEl = document.getElementById("result");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  messageEl.classList.remove("error");

  const first = Number(firstInput.value);
  const second = Number(secondInput.value);

  if (Number.isNaN(first) || Number.isNaN(second)) {
    resultEl.textContent = "-";
    messageEl.textContent = "Please enter valid numbers in both fields.";
    messageEl.classList.add("error");
    return;
  }

  try {
    const answer = calculate(first, second, operationInput.value);
    resultEl.textContent = String(answer);
    messageEl.textContent = "Calculated successfully.";
  } catch (error) {
    resultEl.textContent = "-";
    messageEl.textContent = error.message;
    messageEl.classList.add("error");
  }
});

resetBtn.addEventListener("click", () => {
  form.reset();
  resultEl.textContent = "0";
  messageEl.textContent = "";
  messageEl.classList.remove("error");
  firstInput.focus();
});
