
export interface ChatState {

}

export enum ChatActionTypes {
    SEND_MESSAGE_REQUEST = "@@chat/SEND_MESSAGE_REQUEST",
    SEND_MESSAGE_SUCCESS = "@@chat/SEND_MESSAGE_SUCCESS",
    SEND_MESSAGE_ERROR = "@@chat/SEND_MESSAGE_ERROR",
}