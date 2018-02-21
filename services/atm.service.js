const accountService = require('./account.service');

class ATMService {

  static getBalance(pin) {
      return accountService.getAccount(pin).balance;
  }

  static makeDeposit(account, amount) {
    const currentBalance = ATMService.getBalance(account.pin);
    const newBalance = parseFloat(currentBalance) + parseFloat(amount);
    account.balance = newBalance;
    accountService.setAccount(account.pin, account);
  }

  static makeWithdrawal(account, amount) {
    const currentBalance = ATMService.getBalance(account.pin);
    const newBalance = parseFloat(currentBalance) - parseFloat(amount);
    if(newBalance < 0) {
      console.log('Withdrawal error, not enough cash'.red);
      return false;
    }
    account.balance = newBalance;
    accountService.setAccount(account.pin, account);
  }

  static showBalance(value) {
    console.log(`Your balance is $${value}`.green);
  }
}

module.exports = ATMService;