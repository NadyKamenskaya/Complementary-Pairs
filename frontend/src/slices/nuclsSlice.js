/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const nuclsAdapter = createEntityAdapter();

const initialState = nuclsAdapter.getInitialState({
  amount: null,
});

const nuclsSlice = createSlice({
  name: 'nucls',
  initialState,
  reducers: {
    addNucl: nuclsAdapter.addOne,
    removeNucl: (state, { payload }) => {
      const nucls = Object
        .values(state.entities)
        .filter((nucl) => nucl.id > payload)
        .map((el) => el.id);
      nuclsAdapter.removeMany(state, nucls);
    },
    changeAmount: (state, { payload }) => {
      state.amount = payload;
    },
  },
});

export const { actions } = nuclsSlice;
const selectors = nuclsAdapter.getSelectors((state) => state.nucls);
export const customSelectors = {
  allNucls: selectors.selectAll,
  currentAmount: (state) => {
    const { amount } = state.nucls;

    return amount;
  },
  nuclsA: (state) => {
    const filtered = selectors.selectAll(state).filter(({ nucl }) => nucl === 'A');

    return filtered;
  },
  nuclsT: (state) => {
    const filtered = selectors.selectAll(state).filter(({ nucl }) => nucl === 'T');

    return filtered;
  },
  nuclsC: (state) => {
    const filtered = selectors.selectAll(state).filter(({ nucl }) => nucl === 'C');

    return filtered;
  },
  nuclsG: (state) => {
    const filtered = selectors.selectAll(state).filter(({ nucl }) => nucl === 'G');

    return filtered;
  },
};

export default nuclsSlice.reducer;
