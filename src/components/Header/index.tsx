import { HeaderProps } from "./types";

export const Header = ({ children }: HeaderProps) => {
  return (
    <nav className="navbar has-shadow">
      <div className="container">{children}</div>
    </nav>
  );
};
