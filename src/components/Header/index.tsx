import { HeaderProps } from "./types";

export const Header = ({ children }: HeaderProps) => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container">{children}</div>
      </nav>
    </header>
  );
};
