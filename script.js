// write javascript here
document.addEventListener("DOMContentLoaded", function () {
  loadExpenses();
  document
    .getElementById("add-expense-btn")
    .addEventListener("click", function () {
      addExpense();
    });

  function addExpense() {
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;
    const category = document.getElementById("expense-category").value;

    if (!name || !amount || !date || !category) {
      alert("please fill all fields!");
      return;
    }

    const expense = { name, amount, date, category };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
  }

  function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    expenseList.innerHTML = "";
    let total = 0;
    expenses.forEach((expense, index) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = expense.name;
      row.appendChild(nameCell);
      const amountCell = document.createElement("td");
      amountCell.textContent = `₹${expense.amount.toFixed(2)}`;
      row.appendChild(amountCell);
      const dateCell = document.createElement("td");
      dateCell.textContent = new Date(expense.date).toLocaleDateString();
      row.appendChild(dateCell);
      const categoryCell = document.createElement("td");
      categoryCell.textContent = expense.category;
      row.appendChild(categoryCell);
      const deleteCell = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", function () {
        deleteExpense(index);
      });
      deleteCell.appendChild(deleteBtn);
      row.appendChild(deleteCell);
      expenseList.appendChild(row);
      total += expense.amount;
    });
    totalAmount.textContent = total.toFixed(2);
  }
  function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
  }
  function loadExpenses() {
    displayExpenses();
  }
});
