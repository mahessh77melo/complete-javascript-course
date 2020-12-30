'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
let sortType = 'afterbegin';
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur);

const displayMovements = movements => {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${Math.abs(mov)}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML(sortType, html);
  });
};
const createUserNames = accs => {
  accs.forEach(user => {
    // map function example
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

const displayBalance = movements => {
  // reduce function example
  const balance = movements.reduce((acc, cur) => acc + cur);
  // console.log(balance);
  labelBalance.innerText = ` ${balance}€`;
};

const calcDisplaySummary = ({ movements: moves, interestRate: int }) => {
  // total income
  const totalIn = moves.filter(mov => mov > 0).reduce((acc, cur) => acc + cur);
  labelSumIn.innerText = `${totalIn}€`;

  // total expense
  const totalOut = moves.filter(mov => mov < 0).reduce((acc, cur) => acc + cur);
  labelSumOut.innerText = `${-totalOut}€`;

  // interest
  const interest = moves
    .filter(mov => mov > 0)
    .map(dep => (dep * int) / 100)
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.innerText = `${interest.toFixed(2)}€`;
};

// LOGIN EVENTS
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  [currentAccount] = accounts.filter(
    user => user.username === username && user.pin === pin
  );
  if (currentAccount) {
    // Display the welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    // Show the app content (opacity to 1)
    containerApp.style.opacity = 100;
    // clear the input fields and take out the focus from the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    refresh();
  } else {
    alert('Wrong Credentials');
  }
});
// Refresh details
const refresh = () => {
  // Display all the transactions of that account
  displayMovements(currentAccount?.movements);
  // Display the account balance on top of the tables
  displayBalance(currentAccount?.movements);
  // function to calculate and display the balance summaries
  calcDisplaySummary(currentAccount);
};
// Login bot for dev purpose
const loginBot = () => {
  inputLoginUsername.value = 'js';
  inputLoginPin.value = '1111';
  btnLogin.click();
  return 'called';
};
loginBot();

// IMPLEMENTING TRANFER
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const boolArray = [
    amount > 0,
    amount < parseInt(labelBalance.innerText),
    receiverAcc !== currentAccount,
    receiverAcc,
  ];
  if (boolArray.every(bool => bool)) {
    // add the transaction to both their movements
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    // update money related details
    refresh();
    // clear the form
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferTo.blur();
  } else {
    alert(
      `Transaction of ${amount} to ${
        receiverAcc?.username || 'unknown account'
      } is not possible.`
    );
  }
});

// CLOSE ACCOUNT
btnClose.addEventListener('click', e => {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  if (username === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      acc => acc.username === username && acc.pin === pin
    );
    if (index > -1) {
      // Delete the user
      accounts.splice(index, 1);
      // Clear the input fields
      inputClosePin.value = inputCloseUsername.value = '';
      // Hide the user interface
      containerApp.style.opacity = 0;
    } else {
      alert('No such Account');
    }
  } else {
    alert('Wrong Credentials');
  }
});

// REQUEST LOAN
// Bank grants the loan only if the user has a deposit of 10% of the requested loan amount
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(amt => amt >= amount / 10)) {
    console.log('Request processed');
    alert(`Request processed for ${amount}€ ! ✔👍`);
    setTimeout(() => {
      currentAccount.movements.push(amount);
      refresh();
    }, 4000);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else if (amount <= 0) {
    alert('Check your loan Amount');
  } else {
    alert(
      `You must have atleast one deposit more than ${
        amount / 10
      }€ to be eligible for the loan`
    );
  }
});
// sorting
btnSort.addEventListener('click', () => {
  sortType === 'afterbegin'
    ? (sortType = 'beforeend')
    : (sortType = 'afterbegin');
  displayMovements(currentAccount.movements);
  sortType === 'afterbegin'
    ? (btnSort.innerHTML = '&downarrow; SORT')
    : (btnSort.innerHTML = '&uparrow; SORT');
});
