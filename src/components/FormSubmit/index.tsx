import classNames from "classnames";
import { FormSubmitProps } from "./types";

export const FormSubmit = ({
  isLoading,
  children,
  onClick,
}: FormSubmitProps) => {
  const buttonClasses = classNames({
    "button ": true,
    "is-link": true,
    "is-loading": isLoading,
  });
  return (
    <div className="control">
      <button className={buttonClasses} type="submit" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
