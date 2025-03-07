
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  authToken: "",
  isSidebarOpen: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    setIsSidebarOpen(state, action) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setAuthToken, setUse, setIsSidebarOpen } = authSlice.actions;
