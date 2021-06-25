import { LayoutProps } from "./types";

export const Layout = ({ heading, subheading, children }: LayoutProps) => {
  return (
    <div className="container">
      <main role="main" className="pb-3">
        <h1>{heading}</h1>
        <div className="row">
          <div className="col-md-12">
            <p>{subheading}</p>
            <hr />
          </div>
          <div className="col-12">{children}</div>
        </div>
      </main>
    </div>
  );
};
