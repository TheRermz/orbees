export interface Transaction {
  id: string;
  title: string;
  description?: string;
  date: string;
  amount: number;
  category: string;
  individualCategoryId?: string;
  groupId?: string;
  groupCategoryId?: string;
  bankAccountId?: string;
  isManual?: boolean;
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

export interface BankAccount {
  id: string;
  userId: string;
  bankName: string;
  agency: string;
  accountNumber: string;
  accountType: 'checking' | 'savings';
}

export interface CategoryRule {
  id: string;
  userId: string;
  pattern: string;
  categoryId: string;
  usageCount: number;
  lastUsedAt: string;
}

export interface GroupMembership {
  id: string;
  internalGroupMemberId: number;
  userId: string | null;
  groupId: string;
  memberName: string;
  role: 'admin' | 'viewer';
  joinedAt: string;
  cancelledAt: string | null;
  isActive: boolean;
}
