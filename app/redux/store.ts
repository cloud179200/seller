import { AnyAction, CombinedState, Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
import customizationSlice, { ICustomizationState } from "./customization/slice"
import userReducer, { IUserState } from "./user/slice";
import utilsReducer, { IUtilsState } from "./utils/slice";
// import { rootSaga } from "./saga";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import config from "@/app/config";

interface IState {
  customization: ICustomizationState;
  user: IUserState;
  common: IUtilsState;
}

const rootReducer: Reducer<CombinedState<IState>, AnyAction> = combineReducers({
  customization: customizationSlice,
  user: userReducer,
  common: utilsReducer,
});


// const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: config.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(
    // sagaMiddleware
    ),
});

// sagaMiddleware.run(rootSaga)


export const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;