export interface Account {
  id: string;
  balance: number;
}

export interface Transaction {
  type?: "withdraw" | "deposit" | "transfer";
  destination: string;
  origin?: string;
  amount: number;
}
