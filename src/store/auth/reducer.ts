import { Reducer } from 'redux'
import { AuthState, AuthActionTypes } from './types'

export const initialState: AuthState = {
    currentUser: {
        id: "",
        avatar: "",
        displayName: "",
        email: "",
        accountType: "",
        profileId: ""
    },
    token: "",
    isLoggingIn: false,
    isRegistering: false,
    isAuthenticated: false,
    error: null
}

export const authReducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                currentUser: {
                    id: "",
                    avatar: "",
                    displayName: "",
                    email: "",
                    accountType: "",
                    profileId: ""
                },
                token: ""
            }
        case AuthActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true
            }
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                currentUser: {
                    id: action.payload.user.id,
                    avatar: action.payload.user.avatar,
                    displayName: action.payload.user.displayName,
                    email: action.payload.user.email,
                    accountType: action.payload.user.accountType,
                    profileId: action.payload.user.profileId
                },
                token: action.payload.token
            }
        case AuthActionTypes.LOGIN_ERROR:
            return {
                ...state,
                isLoggingIn: false,
                error: action.payload
            }
        case AuthActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true
            }
        case AuthActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false
            }
        case AuthActionTypes.REGISTER_ERROR:
            return {
                ...state,
                isRegistering: false,
                error: action.payload
            }
        case AuthActionTypes.AUTH_ERROR_RESET:
            return {
                ...state,
                error: null
            }
        case AuthActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    displayName: action.payload.displayName !== undefined ? action.payload.displayName : state.currentUser.displayName,
                    avatar: action.payload.avatar !== undefined ? action.payload.avatar : state.currentUser.avatar
                }
            }
        default: {
            return state
        }
    }
}
