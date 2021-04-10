import { LayoutProps } from "./types";

export const Layout = ({ heading, subheading, children }: LayoutProps) => {
  return (
    <div className="container">
      <main role="main" className="pb-3">
        <h2>{heading}</h2>
        <div className="row">
          <div className="col-md-12">
            <h4>{subheading}</h4>
            <hr />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};
