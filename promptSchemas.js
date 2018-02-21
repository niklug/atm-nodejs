const colors = require('colors');

const promptSchemas = {
  loginSchema: {
    properties: {
      'pin': {
        description: 'ENTER your pin please'.blue,
        pattern: /^[0-9][0-9][0-9][0-9]$/,
        message: 'pin must be 4 digit number..'.red,
        required: true,
        hidden: true
      }
    }
  },

  chooseOperationSchema: {
    properties: {
      'operation': {
        description: 'Choose operation: 1 - get balance, 2 - make deposit, 3 - make withdrawal, 4 - exit.'.blue,
        pattern: /^[1234]$/,
        message: 'please choose between 1 and 4'.red,
        required: true
      }
    }
  },

  withdrawFundsSchema: {
    properties: {
      'amount': {
        description: 'how much would you like to withdraw? (amount must be divisible by 5)'.blue,
        pattern: /^\d*[05]$/,
        message: 'must be divisible by 5..'.red,
        required: true
      }
    }
  },

  depositFundsSchema: {
    properties: {
      'amount': {
        description: 'how much would you like to deposit?\n'.blue,
        pattern: /^[0-9]+\.[0-9][0-9]$/,
        message: 'include to two decimal places'.red,
        required: true
      }
    }
  }
};

module.exports = promptSchemas;