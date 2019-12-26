import { LoginProps, RegisterProps } from "../../api";

export interface AuthState {
    readonly currentUser: {
        id: string,
        avatar: string,
        displayName: string,
        email: string,
        accountType: string,
        profileId: string
    },
    readonly token: string,
    readonly isLoggingIn: boolean,
    readonly isRegistering: boolean,
    readonly isAuthenticated: boolean,
    readonly error: any
}

export enum AuthActionTypes {
    LOGIN_REQUEST = "@@auth/LOGIN_REQUEST",
    LOGIN_SUCCESS = "@@auth/LOGIN_SUCCESS",
    LOGIN_ERROR = "@@auth/LOGIN_ERROR",
    REGISTER_REQUEST = "@@auth/REGISTER_REQUEST",
    REGISTER_SUCCESS = "@@auth/REGISTER_SUCCESS",
    REGISTER_ERROR = "@@auth/REGISTER_ERROR",
    AUTH_ERROR_RESET = "@@auth/AUTH_ERROR_RESET",
    LOGOUT = "@@auth/LOGOUT",
    SET_CURRENT_USER = "@@auth/SET_CURRENT_USER"
}