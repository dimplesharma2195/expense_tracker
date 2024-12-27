document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const amount = parseFloat(document.getElementById("expense-amount").value);
        const name = document.getElementById("expense-name").value;
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        const expense = {
            id: Date.now(),
            amount,
            name,
            category,
            date
        };

        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses(expenses);

        expenseForm.reset();
    });

    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            expenses = expenses.filter(expense => expense.id !== id);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            displayExpenses(expenses);
        }

        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const expense = expenses.find(expense => expense.id === id);

            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;

            expenses = expenses.filter(expense => expense.id !== id);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            displayExpenses(expenses);
        }
    });

    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.name}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });
    }
    displayExpenses(expenses);

});