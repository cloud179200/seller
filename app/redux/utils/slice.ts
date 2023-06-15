import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actions";
import _ from "underscore"

export interface IUtilsState {
  notifications: Notification[];
  loading: boolean;
  loadingCommon: boolean;
}

interface Notification {
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const initialState: IUtilsState = {
  notifications: [],
  loading: false,
  loadingCommon: false,
}

const utilsSlice = createSlice({
  name: "common",
  initialState: _.clone(initialState),
  
  reducers: {
    [actionTypes.RESET_UTILS_REDUCER_ACTION]: (_state) => {
      _state = _.clone(initialState)
    },
    [actionTypes.SET_LOADING_ACTION]: (state, action: PayloadAction<{ state: boolean }>) => {
      state.loading = action.payload.state;
    },
    [actionTypes.SET_LOADING_COMMON_ACTION]: (state, action: PayloadAction<{ state: boolean }>) => {
      state.loadingCommon = action.payload.state;
    }
  },
});

export const utilsActions = utilsSlice.actions;
export const utilsActionsName = actionTypes;

export default utilsSlice.reducer;