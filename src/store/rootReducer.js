import { combineReducers } from "@reduxjs/toolkit";
import { rootApi } from "@/services/api";
import authReducer from "@/store/features/auth";
import alertsReducer from "@/store/features/alerts";
import commonReducer from "@/store/features/common";
import questionsReducer from "@/store/features/questions";
import testReducer from "@/store/features/test";
import permissionsReducer from "@/store/features/permissions";
import userAuthReducer from "@/store/features/userAuth";
import socketReducer from "@/store/features/socket";
import templatesReducer from "@/store/features/templates";

const appReducer = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  common: commonReducer,
  questions: questionsReducer,
  test: testReducer,
  permissions: permissionsReducer,
  userAuth: userAuthReducer,
  socket: socketReducer,
  templates: templatesReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

const rootReducer = (state, action) => {
  // if (action.type === logout.type) {
  //   // Reset the state of all reducers to their initial state
  //   state = undefined;
  // }  
  return appReducer(state, action);
};

export default rootReducer;
