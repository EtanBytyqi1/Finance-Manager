// Initialize balance with 0 and format it with €
document.getElementById("balance").textContent = "0 €";

// Get the current balance and convert it to a number
let balanceText = document.getElementById("balance").textContent;
let balance = parseFloat(balanceText);



// Log the result
console.log("New balance:", balance);

var newParagraph = document.createElement("p");
newParagraph.textContent = "New balance : " + balance + " €";
document.getElementById("transactionsList").appendChild(newParagraph);


function balanceButton(isIncome) {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);
    
    if (!isNaN(amount) && amount > 0) {
        // Update the balance
        balance = isIncome ? balance + amount : balance - amount;
        
        // Update the display
        document.getElementById("balance").textContent = balance.toFixed(2) + " €";
        
        // Add to transaction history
        addTransaction(amount, isIncome);
        
        // Clear the input
        amountInput.value = "";
    } else {
        alert("Please enter a valid positive number");
    }
}

function addTransaction(amount, isIncome) {
    const transactionsList = document.getElementById("transactionsList");
    
    // Remove the "No transactions" message if it's the first transaction
    if (transactionsList.children.length === 1 && 
        transactionsList.firstElementChild.classList.contains('text-center')) {
        transactionsList.innerHTML = '';
    }
    
    const transaction = document.createElement("div");
    transaction.className = `p-3 rounded-lg ${isIncome ? 'bg-green-50' : 'bg-red-50'} mb-2`;
    
    transaction.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <span class="font-medium">${isIncome ? 'Income' : 'Expense'}</span>
                <span class="text-sm text-gray-500 ml-2">${new Date().toLocaleString()}</span>
            </div>
            <span class="${isIncome ? 'text-green-600' : 'text-red-600'} font-medium">
                ${isIncome ? '+' : '-'}${amount.toFixed(2)} €
            </span>
        </div>
    `;
    
    transactionsList.prepend(transaction);
}





//--------------------------------------











