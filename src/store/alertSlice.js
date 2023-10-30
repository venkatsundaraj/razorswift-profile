import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alertpopup',
  initialState: {
    isLoading: false,
    error: null,
    message: null,
    type: null,
    duration: 0,
    showSnackbar: false, // added field to track whether or not to show snackbar
  },
  reducers: {
    setAlertPopup(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.duration = action.payload.duration;
      state.showSnackbar = true; // set to true to show the snackbar
    },
    clearAlertPopup(state) {
      state.message = null;
      state.duration = 0;
      state.showSnackbar = false; // set to false to hide the snackbar
    },
  },
});

export const { setAlertPopup, clearAlertPopup } = alertSlice.actions;

export default alertSlice.reducer;
