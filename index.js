function display() {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    const expense = { amount, category };
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpenses(expenses);
}

function displayExpenses(expenses) {
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Expense ${index + 1}: Amount - ${expense.amount}, Category - ${expense.category}`;

        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(index));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editExpense(index));

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);

        expensesList.appendChild(listItem);
    });
}

function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (index >= 0 && index < expenses.length) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses(expenses);
    }
}

function editExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (index >= 0 && index < expenses.length) {
        const expense = expenses[index];
        const newAmount = prompt('Edit Amount:', expense.amount);
        const newCategory = prompt('Edit Category:', expense.category);

        if (newAmount !== null && newCategory !== null) {
            expense.amount = newAmount;
            expense.category = newCategory;

            localStorage.setItem('expenses', JSON.stringify(expenses));
            displayExpenses(expenses);
        }
    }
}

const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
displayExpenses(storedExpenses);
