import { nanoid }from "nanoid/non-secure";
import { Toast, ToastTypes } from "./types";

export enum ToastActionTypes {
  ADD_TOAST = "ADD_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
  SET_HEIGHT = "SET_HEIGHT",
  SET_EXITING = "SET_EXITING",
}

export type ToastAction = {
  type: ToastActionTypes;
  id: string;
  title: string;
  message: string;
  toastType: ToastTypes;
  duration: number;
  height: number;
}

export default (toasts: Toast[] = [], action: ToastAction) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [
        {
          id: nanoid(5),
          title: action.title,
          message: action.message,
          type: action.toastType || 'info',
          duration: action.duration || 10000,
          height: 0,
          exiting: false
        },
        ...toasts
      ];
    case "SET_HEIGHT": {
      const index = toasts.findIndex(t => t.id === action.id);
      return [
        ...toasts.slice(0, index),
        {
          ...toasts[index],
          height: action.height
        },
        ...toasts.slice(index + 1)
      ];
    }
    case "SET_EXITING": {
      const index = toasts.findIndex(t => t.id === action.id);
      return [
        ...toasts.slice(0, index),
        {
          ...toasts[index],
          exiting: true
        },
        ...toasts.slice(index + 1)
      ];
    }
    case "REMOVE_TOAST": {
      const index = toasts.findIndex(t => t.id === action.id);
      return [
        ...toasts.slice(0, index),
        ...toasts.slice(index + 1)
      ];
    }
    default:
      return toasts;
  }
};
