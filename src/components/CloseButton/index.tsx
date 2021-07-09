import { CloseButtonProps } from "./types";

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <button onClick={onClick} className="delete" />
);
