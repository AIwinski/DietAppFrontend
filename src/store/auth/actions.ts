import { action } from "typesafe-actions";
import { AuthActionTypes } from "./types";
import { LoginProps, RegisterProps } from "../../api";

export const loginRequest = (data: LoginProps) => action(AuthActionTypes.LOGIN_REQUEST, data);
export const loginSuccess = (data: any) => action(AuthActionTypes.LOGIN_SUCCESS, data);
export const loginError = (error: any) => action(AuthActionTypes.LOGIN_ERROR, error);

export const registerRequest = (data: RegisterProps) => action(AuthActionTypes.REGISTER_REQUEST, data);
export const registerSuccess = (data: any) => action(AuthActionTypes.REGISTER_SUCCESS, data);
export const registerError = (error: any) => action(AuthActionTypes.REGISTER_ERROR, error);

export const resetAuthError = () => action(AuthActionTypes.AUTH_ERROR_RESET);
export const logout = () => action(AuthActionTypes.LOGOUT);

export const setCurrentUser = (data: any) => action(AuthActionTypes.SET_CURRENT_USER, data);
