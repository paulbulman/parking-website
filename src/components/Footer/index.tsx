import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="is-flex is-justify-content-center pb-2">
      <div>
        <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
          GNU General Public License v3
        </a>
        {" | "}
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
};
