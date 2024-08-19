// Sample accounts
const accounts = [
    { name: "Alice", balance: 1000, pin: "1873" },
    { name: "Bob", balance: 1500, pin: "7453" },
    { name: "Charlie", balance: 2000, pin: "9101" }
];

let currentAccount = null;

function login() {
    const pin = document.getElementById('pin').value;
    const loginMessage = document.getElementById('login-message');

    if (pin === "") {
        loginMessage.textContent = 'Please enter a PIN.';
        loginMessage.className = 'error';
        return;
    }

    const account = accounts.find(acc => acc.pin === pin);
    if (account) {
        currentAccount = account;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('atm-section').style.display = 'block';
        document.getElementById('user-name').textContent = account.name;
        loginMessage.textContent = '';  // Clear any previous login error messages
        loginMessage.className = '';    // Clear message class
    } else {
        loginMessage.textContent = 'Incorrect PIN.';
        loginMessage.className = 'error';
    }
}

function logout() {
    currentAccount = null;
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('atm-section').style.display = 'none';
    
    // Reset any messages or input fields
    document.getElementById('login-message').textContent = '';
    document.getElementById('balance-message').textContent = '';
    document.getElementById('deposit-message').textContent = '';
    document.getElementById('withdraw-message').textContent = '';
    document.getElementById('pin').value = '';
    document.getElementById('deposit-amount').value = '';
    document.getElementById('withdraw-amount').value = '';
}

function checkBalance() {
    if (currentAccount) {
        document.getElementById('balance-message').textContent = Your balance is $${currentAccount.balance};
        document.getElementById('balance-message').className = 'success';
    } else {
        document.getElementById('balance-message').textContent = 'Error: Not logged in.';
        document.getElementById('balance-message').className = 'error';
    }
}

function showDeposit() {
    document.getElementById('deposit-section').style.display = 'block';
    document.getElementById('withdraw-section').style.display = 'none';
    document.getElementById('deposit-message').textContent = '';  // Clear any previous deposit messages
    document.getElementById('deposit-message').className = '';
}

function showWithdraw() {
    document.getElementById('withdraw-section').style.display = 'block';
    document.getElementById('deposit-section').style.display = 'none';
    document.getElementById('withdraw-message').textContent = '';  // Clear any previous withdrawal messages
    document.getElementById('withdraw-message').className = '';
}

function deposit() {
    if (!currentAccount) {
        document.getElementById('deposit-message').textContent = 'Error: Not logged in.';
        document.getElementById('deposit-message').className = 'error';
        return;
    }
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (amount > 0) {
        currentAccount.balance += amount;
        document.getElementById('deposit-message').textContent = Deposit successful. New balance is $${currentAccount.balance};
        document.getElementById('deposit-message').className = 'success';
        document.getElementById('balance-message').textContent = Your balance is $${currentAccount.balance};
    } else {
        document.getElementById('deposit-message').textContent = 'Invalid deposit amount.';
        document.getElementById('deposit-message').className = 'error';
    }
    document.getElementById('deposit-amount').value = '';
}

function withdraw() {
    if (!currentAccount) {
        document.getElementById('withdraw-message').textContent = 'Error: Not logged in.';
        document.getElementById('withdraw-message').className = 'error';
        return;
    }
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    if (amount > 0 && amount <= currentAccount.balance) {
        currentAccount.balance -= amount;
        document.getElementById('withdraw-message').textContent = Withdrawal successful. New balance is $${currentAccount.balance};
        document.getElementById('withdraw-message').className = 'success';
        document.getElementById('balance-message').textContent = Your balance is $${currentAccount.balance};
    } else {
        document.getElementById('withdraw-message').textContent = 'Invalid withdrawal amount or insufficient funds.';
        document.getElementById('withdraw-message').className = 'error';
    }
    document.getElementById('withdraw-amount').value = '';
}