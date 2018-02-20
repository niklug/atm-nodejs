const prompt = require('prompt');

const ATMService = require('../services/atm.service');
const AccountService = require('../services/account.service');

class ATMController {
  constructor() {
    this.session = {};
    prompt.start();
  }

  run() {
    console.log(' ENTER your PIN please ');
    prompt.get(['pin'], (err, result) => {
      const pin = result.pin;

      const isPinValid = this.checkPIN(pin);

      if(isPinValid) {
        this.chooseOperation();
      } else {
        console.log('PIN is not valid, ');
        this.run();
      }
    });
  }

  chooseOperation() {
    console.log('Choose operation: 1 - get balance, 2 - make deposit, 3 - make withdrawal, 4 - exit.');
    prompt.get(['operation'], this.operationsFlow.bind(this));
  }

  checkPIN(pin) {
    const account = AccountService.getAccount(pin);
    if(account) {
      this.session.account = account;
      return true;
    }
    return false;
  }

  operationsFlow(err, result) {
    switch(result.operation) {
      case '1':
        const balance = ATMService.getBalance(this.session.account.pin);
        console.log(`Your balance is ${balance}`);
        this.chooseOperation();
      break;
      case '2':
        console.log('Set deposit amount');
        prompt.get(['amount'], (err, result) => {
          ATMService.makeDeposit(this.session.account, result.amount);
          this.chooseOperation();
        });
      break;
      case '3':
        console.log('Make withdrawal, set amount');
        prompt.get(['amount'], (err, result) => {
          ATMService.makeWithdrawal(this.session.account, result.amount);
          this.chooseOperation();
        });
      break;
      case '4':
      break;
    }
  }
}

module.exports = ATMController;