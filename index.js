const ATM = require('./controllers/atm.controller');

const AccountService = require('./services/account.service');

// set predefined account 
AccountService.initDefaultAccount();

const ATMInstance = new ATM();

console.log('test');

ATMInstance.run();



