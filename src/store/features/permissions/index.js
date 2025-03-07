import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: [
    {
      step: 1,
      title: "System Compatibility",
      description:
        "Please make sure your system has a microphone and a camera. Disable any interfering software like Grammar or Spell check plugins.",
      status: "pending", // "completed", "pending", "error"
    },
    {
      step: 2,
      title: "Webcam & Audio Permissions",
      description:
        "Please allow access to your webcam and microphone to proceed.",
      status: "pending",
    },
    {
      step: 3,
      title: "Screen Permissions",
      description:
        "Requesting Screen Share Permissions.",
      status: "pending",
      button: true
    },
  ],
  screenStream: null, // Store the stream or any related data
  videoStream: null,
  startRecording: false
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermission(state, action) {
      const { step, status } = action.payload;
      state.permissions = state.permissions.map((permission) =>
        permission.step === step ? { ...permission, status } : permission
      );
    },
    setScreenStream: (state, action) => {
      state.screenStream = action.payload;
    },
    setVideoStream: (state, action) => {
      state.videoStream = action.payload;
    },
    clearsetScreenStream: (state) => {
      state.screenStream = null;
    },
    setStartRecording: (state, action) => {
      state.startRecording = action.payload
    },
  },
});

export default permissionsSlice.reducer;
export const { setPermission, setScreenStream, clearsetScreenStream, setStartRecording, setVideoStream } = permissionsSlice.actions;
