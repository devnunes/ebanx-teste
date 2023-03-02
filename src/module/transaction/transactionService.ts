const transaction = {
  withdraw: (accountIndexToBeupdated: number, amount: number) => {
    accounts[accountIndexToBeupdated].balance =
      accounts[accountIndexToBeupdated].balance - amount;
  },
  deposit: (accountIndexToBeupdated: number, amount: number) => {
    accounts[accountIndexToBeupdated].balance =
      accounts[accountIndexToBeupdated].balance + amount;
  },
};
