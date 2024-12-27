export interface Transaction {
    isSpending: boolean;
    category?: string;
    date?: Date | string;
    isNeed: boolean;
    price?: number;
}
