import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: ['Despesa', 'Receita', 'Transferência']
  };

const transactionTypesSlices = createSlice({
    name: "transactionTypes",
    initialState,
    reducers: {}
});

export default transactionTypesSlices.reducer;