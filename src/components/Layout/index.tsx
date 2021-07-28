import { LayoutProps } from "./types";

export const Layout = ({ heading, subheading, children }: LayoutProps) => {
  return (
    <div className="container pl-3 pr-3 pb-3">
      <main role="main">
        <h1 className="title pt-5">{heading}</h1>
        <div className="row pb-5">
          <h2 className="subtitle">{subheading}</h2>
          <hr />
          {children}
        </div>
      </main>
    </div>
  );
};
