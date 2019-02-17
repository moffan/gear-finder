import { Action } from "redux";

export interface FluxStandardAction<T> extends Action {
  payload: T | Error;
  error?: boolean;
  meta?: any;
}
