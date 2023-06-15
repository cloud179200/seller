import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actions";
import type { PayloadAction } from "@reduxjs/toolkit";
import { customizationActions } from "./slice";


function* resetCustomization() {
  yield put(customizationActions[actionTypes.RESET_CUSTOMIZATION_REDUCER_ACTION]())
}

function* setMenu(action: PayloadAction<{ opened: boolean }>) {
  yield put(customizationActions[actionTypes.SET_MENU](action.payload))
}

function* openMenu(action: PayloadAction<{ id: string }>) {
  yield put(customizationActions[actionTypes.MENU_OPEN](action.payload))
}

function* setFontFamily(action: PayloadAction<{ fontFamily: string }>) {
  yield put(customizationActions[actionTypes.SET_FONT_FAMILY](action.payload))
}

function* setBorderRadiusMenu(action: PayloadAction<{ borderRadius: number }>) {
  yield put(customizationActions[actionTypes.SET_BORDER_RADIUS](action.payload))
}

export function* customizationSaga() {
  yield takeLatest(customizationActions[actionTypes.SET_MENU].type, setMenu);
  yield takeLatest(customizationActions[actionTypes.RESET_CUSTOMIZATION_REDUCER_ACTION].type, resetCustomization);
  yield takeLatest(customizationActions[actionTypes.MENU_OPEN].type, openMenu);
  yield takeLatest(customizationActions[actionTypes.SET_FONT_FAMILY].type, setFontFamily);
  yield takeLatest(customizationActions[actionTypes.SET_BORDER_RADIUS].type, setBorderRadiusMenu);
}