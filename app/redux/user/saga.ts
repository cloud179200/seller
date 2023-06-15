import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actions";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userActions } from "./slice";


function* setUserAction(action: PayloadAction<any>) {
  yield put(userActions[actionTypes.SET_USER_ACTION](action.payload))
}

export function* userSaga() {
  yield takeLatest(userActions[actionTypes.SET_USER_ACTION].type, setUserAction);
}