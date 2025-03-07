import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteId: null,
  editItem: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setDeleteId(state, action) {
      state.deleteId = action.payload;
    },
    setEditItem(state, action) {
      state.editItem = action.payload;
    }
  },
});

export default commonSlice.reducer;
export const { setDeleteId, setEditItem } = commonSlice.actions;
