import { configureStore } from '@reduxjs/toolkit';

import nuclsReducer from './nuclsSlice.js';

export default configureStore({
  reducer: {
    nucls: nuclsReducer,
  },
});
