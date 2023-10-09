import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer, // making an invoice slice
  }
});

export default store;