import AccountService from "./accountService";

class TransactionService {
  static withdraw(origin: string, amount: number) {
    const account = AccountService.findOne(origin);
    if (account.balance < amount) throw new Error();
    account.balance = account.balance - amount;
    return account;
  }

  static deposit(destination: string, amount: number) {
    const account = AccountService.findOne(destination);
    account.balance = account.balance + amount;
    return account;
  }
}

export default TransactionService;
