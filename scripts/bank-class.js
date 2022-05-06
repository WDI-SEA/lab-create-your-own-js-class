class BankAccount {
  constructor(type) {
    this.type = type || 'checking'
    this.balance = 0
    this.overdraftFees = 0
  }

  // Class variables
  static totalBalances = 0

  // Instance methods
  deposit(amount) {
    this.balance += amount 
    BankAccount.totalBalances += amount
  }

  withdrawl(amount) {
    this.balance -= amount
    if(this.balance < 0) this.overdraftFees += 20
    BankAccount.totalBalances -= amount
  }
}

class ChildAccount extends BankAccount {
  constructor() {
    super()
  }

  // method override
  withdrawl(amount) {
    console.log(this)
    if(this.balance - amount >= 0) {
      // this.balance -= amount
      // BankAccount.totalBalances -= amount
      // kick it back up to the parent class's method
      super.withdrawl(amount)
    }
  }
}

// testing
try {
  const checking = new BankAccount()
  checking.deposit(10)
  checking.deposit(20)
  checking.withdrawl(15)
  console.log(`checking.balance: expected 15 and got ${checking.balance}`)
  
  const savings = new BankAccount('savings')
  savings.deposit(100)
  
  console.log(`savings.type: expected 'savings' and got ${savings.type}`)
  console.log(`BankAccount.totalBalances: expected 115 and got ${BankAccount.totalBalances}`)
  
  const overdraft = new BankAccount()
  overdraft.withdrawl(5000)
  console.log(`overdraft.balance: expected -5000 and got ${overdraft.balance}`)
  console.log(`overdraft.overdraftFees: expected 20 and got ${overdraft.overdraftFees}`)
  
  const childAccount = new ChildAccount()
  childAccount.deposit(50)
  childAccount.withdrawl(25)
  childAccount.withdrawl(1000)
  console.log(`childAccount.balance: expected 25 and got ${childAccount.balance}`)
  console.log(`childAccount.overdraft: expected 0 and got ${childAccount.overdraftFees}`)
} catch(err) {
  console.log(err)
}
