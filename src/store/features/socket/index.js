import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null,  // This will hold the socket instance
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;  // Save socket instance
    },
    clearSocket(state) {
      state.socket = null;  // Clear socket instance
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;

export default socketSlice.reducer;
