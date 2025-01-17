export interface Transaction {
  isSpending: boolean;
  category?: string;
  date?: Date | string;
  isNeed: boolean | null;
  price?: string;
  isTouched?: boolean;
}
