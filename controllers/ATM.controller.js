const prompt = require('prompt');
const promptSchemas = require('../promptSchemas');
const ATMService = require('../services/atm.service');
const AccountService = require('../services/account.service');

class ATMController {
  constructor() {
    this.session = {};
    prompt.start();
  }

  run() {
    prompt.get(promptSchemas.loginSchema, (err, result) => {
      const isPinValid = this.checkPIN(result.pin);

      if(isPinValid) {
        this.chooseOperation();
      } else {
        console.log('pin is not valid, '.red);
        this.run();
      }
    });
  }

  chooseOperation() {
    prompt.get(promptSchemas.chooseOperationSchema, this.operationsFlow.bind(this));
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
        console.log(`Your balance is $${balance}`.green);
        this.chooseOperation();
      break;
      case '2':
        prompt.get(promptSchemas.depositFundsSchema, (err, result) => {
          ATMService.makeDeposit(this.session.account, result.amount);
          this.chooseOperation();
        });
      break;
      case '3':
        prompt.get(promptSchemas.withdrawFundsSchema, (err, result) => {
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