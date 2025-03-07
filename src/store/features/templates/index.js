import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  template: {},
  templateId: "",
  allTemplates: []
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplate(state, action) {
      state.template = action.payload;  // Save socket instance
    },
    setAllTemplates(state, action) {
      state.allTemplates = action.payload;  // Save socket instance
    },
    setTemplateId(state, action) {
      state.templateId = action.payload;  // Save socket instance
    },
  },
});

export const { setTemplate, setAllTemplates, setTemplateId } = templatesSlice.actions;

export default templatesSlice.reducer;
