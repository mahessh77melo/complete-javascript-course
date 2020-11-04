'use strict';

// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    200,
    455.23,
    -306.5,
    25000,
    -642.21,
    -133.9,
    79.97,
    1300,
    350,
    560,
    -700,
  ],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
    '2020-10-28T03:57:54.651Z',
    '2020-10-30T03:57:54.651Z',
    '2020-10-31T03:57:54.651Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [
    5000,
    3400,
    -150,
    -790,
    -3210,
    -1000,
    8500,
    -30,
    -400,
    500,
    700,
    450,
  ],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-05-10T14:43:26.374Z',
    '2020-05-14T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
    '2020-10-28T03:57:54.651Z',
    '2020-10-31T03:57:54.651Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const processDate = (date2, date1) => {
  // console.log(date1, date2);
  const daysPassed = (date2, date1) =>
    Math.round(
      Math.abs(new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24)
    );
  const number = daysPassed(date2, date1);
  return number === 1
    ? 'Yesterday'
    : number === 0
    ? 'Today'
    : number > 7
    ? new Intl.DateTimeFormat('en-GB').format(new Date(date1))
    : `${number} days ago`;
};

const processCurrency = (locale, currency, val) => {
  const option = {
    style: 'currency',
    currency,
  };
  return new Intl.NumberFormat(locale, option).format(Math.abs(val.toFixed(2)));
};

const displayMovements = ({ movements, movementsDates, currency, locale }) => {
  containerMovements.innerHTML = '';
  // date time management
  movements.forEach((mov, i) => {
    const dateString = processDate(new Date().toISOString(), movementsDates[i]);
    const formattedMov = processCurrency(locale, currency, mov);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
          <div class="movements__date">
          ${dateString}
          </div>
          <div class="movements__value">${formattedMov}</div>
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

const displayBalance = ({ movements, locale, currency }) => {
  // reduce function example
  const balance = movements.reduce((acc, cur) => acc + cur);
  const formattedBalance = processCurrency(locale, currency, balance);
  // console.log(balance);
  labelBalance.innerText = ` ${formattedBalance}`;
};

const calcDisplaySummary = ({
  movements: moves,
  interestRate: int,
  locale,
  currency,
}) => {
  // total income
  const totalIn = moves.filter(mov => mov > 0).reduce((acc, cur) => acc + cur);
  labelSumIn.innerText = `${processCurrency(locale, currency, totalIn)}`;

  // total expense
  const totalOut = moves.filter(mov => mov < 0).reduce((acc, cur) => acc + cur);
  labelSumOut.innerText = `-${processCurrency(locale, currency, totalOut)}`;

  // interest
  const interest = moves
    .filter(mov => mov > 0)
    .map(dep => (dep * int) / 100)
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.innerText = `${processCurrency(locale, currency, interest)}`;
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
    // Clear the old timeout if there is any
    clearInterval(timer);
    // Start the logout timer
    startTimer();
    // refresh the whole UI
    refresh();
  } else {
    alert('Wrong Credentials');
  }
});
// Refresh details
const refresh = () => {
  // Update the last time the app refreshed
  const now = new Date();
  console.log(navigator);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
  };
  const gbNow = new Intl.DateTimeFormat(navigator.language, options).format(
    now
  );
  labelDate.textContent = gbNow;
  // Display all the transactions of that account
  displayMovements(currentAccount);
  // Display the account balance on top of the tables
  displayBalance(currentAccount);
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
// loginBot();

// IMPLEMENTING TRANSFER
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const balance = currentAccount.movements.reduce((acc, cur) => acc + cur);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const boolArray = [
    amount > 0,
    amount < balance,
    receiverAcc !== currentAccount,
    receiverAcc,
  ];
  if (boolArray.every(bool => bool)) {
    // add the transaction to both their movements
    const now = new Date().toISOString();
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(now);
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(now);
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
  const amount = Math.ceil(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(amt => amt >= amount / 10)) {
    console.log('Request processed');
    setTimeout(() => {
      const now = new Date().toISOString();
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(now);
      refresh();
      alert(
        `Loan granted for ${amount}${
          currentAccount.currency === 'EUR' ? '€' : '$'
        } ! ✔👍`
      );
    }, 4000);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else if (amount <= 0) {
    alert('Check your loan Amount');
  } else {
    alert(
      `You must have atleast one deposit more than ${amount / 10}${
        currentAccount.currency === 'EUR' ? '€' : '$'
      } to be eligible for the loan`
    );
  }
});
// sorting
btnSort.addEventListener('click', () => {
  sortType === 'afterbegin'
    ? (sortType = 'beforeend')
    : (sortType = 'afterbegin');
  displayMovements(currentAccount);
  sortType === 'afterbegin'
    ? (btnSort.innerHTML = '&downarrow; SORT')
    : (btnSort.innerHTML = '&uparrow; SORT');
});
var timer;
// setting the logout timer
function startTimer() {
  let fiveMins = 1000 * 60 * 1;
  const deadline = Date.now() + fiveMins;
  timer = setInterval(() => {
    const time = deadline - Date.now();
    if (time <= 750) location.reload();
    const mins = Math.floor(time / 1000 / 60);
    const secs = Math.floor((time / 1000) % 60);
    labelTimer.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    if (time < 30000) {
      labelTimer.style.color = 'orangered';
    }
  }, 1000);
}
// final version (every function is my own version)
