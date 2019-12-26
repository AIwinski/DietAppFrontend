import { Reducer } from 'redux'
import { ChatState, ChatActionTypes } from './types'

export const initialState: ChatState = {

}

export const chatReducer: Reducer<ChatState> = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.SEND_MESSAGE_REQUEST:
            return {
                ...state,
            }
        case ChatActionTypes.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
            }
        case ChatActionTypes.SEND_MESSAGE_ERROR:
            return {
                ...state
            }
        default: {
            return state
        }
    }
}