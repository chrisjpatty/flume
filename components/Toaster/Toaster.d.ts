import { ToastAction } from "../../toastsReducer";
import { Toast as ToastType } from "../../types";
declare type ToasterProps = {
    toasts: ToastType[];
    dispatchToasts: (action: ToastAction) => void;
};
declare const Toaster: ({ toasts, dispatchToasts }: ToasterProps) => JSX.Element;
export default Toaster;
