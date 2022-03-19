import { nanoid }from "nanoid/non-secure/index";

export default (toasts = [], action) => {
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
