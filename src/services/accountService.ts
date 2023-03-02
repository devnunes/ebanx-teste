import { accounts } from "../app";
import { IAccount } from "../global";

class AccountService {
  static findOne(id: string): IAccount {
    const accountFounded = accounts.findIndex(item => item.id === id);
    return accounts[accountFounded];
  }

  static createAccount(id: string) {
    accounts.push({ id, balance: 0 });
  }
}

export default AccountService;
