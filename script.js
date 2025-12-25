let balance = 0;
let incomeTotal = 0;
let expenseTotal = 0;

updateUI();

function updateUI() {
  document.getElementById("balance").textContent = balance.toFixed(2) + " €";
  document.getElementById("totalIncome").textContent = incomeTotal.toFixed(2) + " €";
  document.getElementById("totalExpense").textContent = expenseTotal.toFixed(2) + " €";
}

function balanceButton(isIncome) {
  const amountInput = document.getElementById("amount");
  const descriptionInput = document.getElementById("description");

  const amount = parseFloat(amountInput.value);
  const desc = descriptionInput.value.trim();

  if (isNaN(amount) || amount <= 0 || desc === "") {
    alert("Enter a valid amount and description");
    return;
  }

  if (isIncome) {
    balance += amount;
    incomeTotal += amount;
  } else {
    balance -= amount;
    expenseTotal += amount;
  }

  updateUI();
  addTransaction(amount, desc, isIncome);

  amountInput.value = "";
  descriptionInput.value = "";
}

function addTransaction(amount, desc, isIncome) {
  const list = document.getElementById("transactionsList");
  document.getElementById("no-transactions").style.display = "none";

  const div = document.createElement("div");
  div.dataset.type = isIncome ? "income" : "expense";
  div.className = `animate-slide flex justify-between items-center p-3 rounded-lg ${
    isIncome ? "bg-green-50" : "bg-red-50"
  }`;

  div.innerHTML = `
    <div>
      <p class="font-medium">${desc}</p>
      <p class="text-sm text-gray-500">${isIncome ? "Income" : "Expense"}</p>
    </div>
    <div class="flex items-center gap-4">
      <span class="${isIncome ? "text-green-600" : "text-red-600"}">
        ${isIncome ? "+" : "-"}${amount.toFixed(2)} €
      </span>
      <button class="text-gray-500 hover:text-red-600">🗑</button>
    </div>
  `;

  div.querySelector("button").onclick = () => {
    if (!confirm("Delete this transaction?")) return;

    if (isIncome) {
      balance -= amount;
      incomeTotal -= amount;
    } else {
      balance += amount;
      expenseTotal -= amount;
    }

    div.remove();
    updateUI();

    if (list.children.length === 0) {
      document.getElementById("no-transactions").style.display = "block";
    }
  };

  list.prepend(div);
}

function filterTransactions(type) {
  document.querySelectorAll("#transactionsList > div").forEach(t => {
    t.style.display =
      type === "all" || t.dataset.type === type ? "flex" : "none";
  });
}

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}
