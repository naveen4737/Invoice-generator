import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [], // array of all the invoices
    currentEdit: null, // defines index of invoice which we want to use (to edit OR to make new)
    editing: false // defines whether while using currentEdit, we want to edit it OR make new invoice from it
  },
  reducers: {
    addInvoice: (state, action) => {
      // adds a new invoice
      state.invoices.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      // Here, we are getting index of the invoice which is to be deleted..
      const newInvoices = state.invoices.filter((invoice, index)=>index!==action.payload.index)
      return {invoices: newInvoices, currentEdit: null, editing: false};
    },
    editInvoice: (state, action) => {
      // Edits any invoice, by taking its index in invoices array, and replaces it with new payload.invoice
      const newInvoices = state.invoices.map((invoice, index)=>{
        if(index!==action.payload.index)
          return invoice;
        return action.payload.invoice;
      })
      return {invoices: newInvoices, currentEdit: action.payload.index, editing: true};
    },
    updateToEdit: (state, action) => {
      // changes our mode from normal/edit/make new
      // ------- depending on the value of currentEdit & editing
      // --------currentEdit == null                        [We are not editing any invoice]
      // --------currentEdit != null & editing == true      [We are editing an invoice]
      // --------currentEdit != null & editing == false     [We are making new invoice, using invoice at index currentEdit]
      return {...state, currentEdit: action.payload.index, editing: action.payload.editing};
    }
  }
});

export const {addInvoice, deleteInvoice, editInvoice, updateToEdit} = invoiceSlice.actions;

export default invoiceSlice.reducer;