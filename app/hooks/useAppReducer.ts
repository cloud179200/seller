import { useReducer } from "react";
import customizationSlice from "../redux/customization/slice";
import userSlice from "../redux/user/slice";
import utilsSlice from "../redux/utils/slice";
import { TypedUseSelectorHook } from "react-redux";
import { IState, rootReducer } from "../redux/store";
import { CombinedState } from "redux";

const useAppReducer = () => {
  const [useReducerState, useReducerDispatch] = useReducer(rootReducer, {
    customization: customizationSlice.getInitialState(),
    user: userSlice.getInitialState(),
    common: utilsSlice.getInitialState(),
  });
  const dispatch = () => useReducerDispatch;
  const selector: TypedUseSelectorHook<IState> = (fn: (_state: CombinedState<IState>) => any) => {
    return fn(useReducerState);
  };
  return { selector, dispatch };
};

export default useAppReducer;