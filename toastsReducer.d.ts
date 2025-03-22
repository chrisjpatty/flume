import { Toast, ToastTypes } from "./types";
export declare enum ToastActionTypes {
    ADD_TOAST = "ADD_TOAST",
    REMOVE_TOAST = "REMOVE_TOAST",
    SET_HEIGHT = "SET_HEIGHT",
    SET_EXITING = "SET_EXITING"
}
export declare type ToastAction = {
    type: ToastActionTypes.ADD_TOAST;
    title: string;
    message: string;
    toastType?: ToastTypes;
    duration?: number;
} | {
    type: ToastActionTypes.REMOVE_TOAST;
    id: string;
} | {
    type: ToastActionTypes.SET_HEIGHT;
    id: string;
    height: number;
} | {
    type: ToastActionTypes.SET_EXITING;
    id: string;
};
declare const _default: (toasts: Toast[] | undefined, action: ToastAction) => Toast[];
export default _default;
