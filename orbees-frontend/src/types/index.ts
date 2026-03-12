export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  source?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  budget?: number;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  balance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
