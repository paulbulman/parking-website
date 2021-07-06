import { TableProps } from "./types";

export const Table = ({ children }: TableProps) => {
  return (
    <div className="table-container">
      <table className="table is-bordered is-striped is-fullwidth">
        {children}
      </table>
    </div>
  );
};
