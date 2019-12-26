import { action } from "typesafe-actions";
import { ChatActionTypes } from "./types";
import { SendMessageProps } from "../../api";

export const sendMessageRequest = (data: SendMessageProps) => action(ChatActionTypes.SEND_MESSAGE_REQUEST, data);
export const sendMessageSuccess = (data: any) => action(ChatActionTypes.SEND_MESSAGE_SUCCESS, data);
export const sendMessageError = (error: any) => action(ChatActionTypes.SEND_MESSAGE_ERROR, error);