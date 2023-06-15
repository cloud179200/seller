import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actions";
import _ from "underscore"

export interface IUserState {
  userInfo: any | null,
  userDetail: any | null,
}

const initialState: IUserState = {
  userInfo: null,
  userDetail: null,
}
const userSlice = createSlice({
  name: "user",
  initialState: _.clone(initialState),
  reducers: {
    [actionTypes.SET_USER_ACTION]: (state, action: PayloadAction<any>) => {
      state = _.clone(initialState)
      state.userInfo = { ...action.payload }
    }
  }
});

export const userActions = userSlice.actions;
export const userActionsName = actionTypes;

export default userSlice.reducer;