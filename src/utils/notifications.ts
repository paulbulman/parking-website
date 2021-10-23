import { toast } from "react-toastify";

export const success = (message: string | undefined) => {
  toast.success(message);
};

export const error = (message: string | undefined) => {
  toast.error(message);
};
