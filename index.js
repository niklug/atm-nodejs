const ATM = require('./controllers/ATM.controller');

const AccountService = require('./services/account.service');

AccountService.initDefaultAccount();

const ATMInstance = new ATM();

ATMInstance.run();



