import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actions";
import type { PayloadAction } from "@reduxjs/toolkit";
import { utilsActions } from "./slice";


function* resetUtils() {
  yield put(utilsActions[actionTypes.RESET_UTILS_REDUCER_ACTION]())
}

function* setLoadingAction(action: PayloadAction<{ state: boolean }>) {
  yield put(utilsActions[actionTypes.SET_LOADING_ACTION](action.payload))
}

function* setLoadingCommonAction(action: PayloadAction<{ state: boolean }>) {
  yield put(utilsActions[actionTypes.SET_LOADING_COMMON_ACTION](action.payload))
}

export function* utilsSaga() {
  yield takeLatest(utilsActions[actionTypes.RESET_UTILS_REDUCER_ACTION].type, resetUtils);
  yield takeLatest(utilsActions[actionTypes.SET_LOADING_ACTION].type, setLoadingAction);
  yield takeLatest(utilsActions[actionTypes.SET_LOADING_COMMON_ACTION].type, setLoadingCommonAction);
}