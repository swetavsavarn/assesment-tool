import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  routeLoading: false,
  snackbar: {
    isVisible: false,
    message: "",
    type: "info", // Can be 'success', 'error', 'warning', or 'info'
  },
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    showSnackbar(state, action) {
      const { message, type } = action.payload;
      state.snackbar = { isVisible: true, message, type };
    },
    hideSnackbar(state) {
      state.snackbar.isVisible = false;
    },
  },
});

export default alertsSlice.reducer;
export const { setLoading, showSnackbar, hideSnackbar } = alertsSlice.actions;
