import { toast } from "react-toastify";

type ToastProps = 'error' | 'success' | 'info' | 'warning';

export default function Toast(message: string, type: ToastProps = 'info') {
  return toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}