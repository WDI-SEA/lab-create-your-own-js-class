class BankAccount {
  constructor(accountType) {
    this.accountType = accountType
    this.balance = 0
    // if the account is overdrawn
    this.overdraftFees = 0
  }
  // staic means shared between all 'instances' or object made by the class
  static totalBalances = 0

  // deposit -- add money to your account
  deposit(amount) { 
    // add the new amount to 'this' instances balance
    this.balance += amount
    // update all the money in the bank
    BankAccount.totalBalances += amount 
  }

  // withdraw -- remove money from your account
  withdraw(amount) { 
    // remove the money from this particular account
    this.balance -= amount
    // check if the balance is below 0
    if (this.balance < 0) {
      // if so -- apply an over draft charge
      this.overdraftFees += 20
      console.log('you have accrued overdraft fees.')
    }
    // subtract the money from the bank's total savings
    BankAccount.totalBalances -= amount
  }
}

// ChildAccount inherits properties from Account
class ChildAccount extends BankAccount {
  // constructor makes us the object
  constructor(accountType) {
    // passes data from this constructor to the parent
    super(accountType)
  }

  // method override 
  withdraw(amount) {
    // check if the new balance after subracting the amount is greater than 0, and if so allow the transaction
    if (this.balance - amount >= 0) {
      super.withdraw(amount)
    } else {
      console.log('error: you dont have any funds, sorry kid.')
    }
  }
}

// const myAccount = new BankAccount('checking')
// const savings = new BankAccount('savings')
// savings.deposit(23)
// // deposit some money
// myAccount.deposit(100)
// myAccount.deposit(100)
// myAccount.withdraw(50)
// myAccount.withdraw(2000) // worth it
// console.log(myAccount)
// console.log('mr money bags has:', BankAccount.totalBalances)

const myChildAccount = new ChildAccount('checking')
myChildAccount.deposit(5)
// console.log(myChildAccount)
// console.log('the bank has:', BankAccount.totalBalances)
myChildAccount.withdraw(1000)
console.log(myChildAccount)
myChildAccount.withdraw(2)
console.log(myChildAccount)
