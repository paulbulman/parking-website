import { toast } from "react-toastify";

export const success = (message: string | undefined) => {
  toast(message, { className: "notification is-success pr-6" });
};

export const error = (message: string | undefined) => {
  toast(message, { className: "notification is-danger pr-6" });
};
