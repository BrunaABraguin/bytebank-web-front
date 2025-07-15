import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TransactionType = 'Receita' | 'Despesa' | 'Transferência';

export interface Transaction {
    id: number;
    type: TransactionType;
    value: number;
    date: string;
    [key: string]: unknown;
}

export interface TransactionsState {
    transactions: Transaction[];
}

const initialState: TransactionsState = {
    transactions: []
};

interface AddTransactionPayload {
    type: TransactionType;
    value: number;
    [key: string]: unknown;
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<AddTransactionPayload>) => {
            const { type, value } = action.payload;
            let adjustedValue = Math.abs(value);

            if (type === 'Despesa' || type === 'Transferência') {
                adjustedValue = -Math.abs(value);
            }

            state.transactions.push({
                ...action.payload,
                value: adjustedValue,
                date: new Date().toISOString(),
                id: state.transactions.length + 1
            });
        }
    }
});

export const selectTransactions = createSelector(
    (state: { transactions: TransactionsState }) => state.transactions.transactions,
    transactions => transactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date)
    }))
);

export const selectCurrentBalance = createSelector(
    [selectTransactions],
    (transactions: ReturnType<typeof selectTransactions>) =>
        transactions.reduce((balance, transaction) => balance + transaction.value, 0)
);

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;