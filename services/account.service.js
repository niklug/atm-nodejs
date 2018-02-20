const localStorage = require('localStorage');

let userDataMock = 
  {
    id: 10001,
    pin: 1234,
    balance: 100
  };

class AccountService {

  static initDefaultAccount() {
    localStorage.setItem(userDataMock.pin, JSON.stringify(userDataMock));
  }

  static getAccount(pin) {
    return JSON.parse(localStorage.getItem(pin));
  }

  static setAccount(pin, data) {
    localStorage.setItem(pin, JSON.stringify(data));
  }
}

module.exports = AccountService;