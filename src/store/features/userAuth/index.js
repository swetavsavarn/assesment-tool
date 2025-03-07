
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  authToken: "",
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserAuthToken(state, action) {
      state.authToken = action.payload;
    },
  },
});

export default userAuthSlice.reducer;
export const { setUser, setUserAuthToken } = userAuthSlice.actions;
