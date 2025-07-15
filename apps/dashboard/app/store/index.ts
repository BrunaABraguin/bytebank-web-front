import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transactionTypesReducer from "../features/transactionTypes/transactionTypesSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";

const rootReducer = combineReducers({
  transactionTypes: transactionTypesReducer,
  transactions: transactionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
