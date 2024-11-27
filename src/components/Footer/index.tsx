import { Link } from "react-router";

const Licence = () => (
  <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
    GNU General Public License v3
  </a>
);

const Privacy = () => <Link to="/privacy">Privacy Policy</Link>;

export const Footer = () => {
  return (
    <footer className="is-flex is-justify-content-center pb-2">
      <div className="is-hidden-mobile">
        <Licence />
        {" | "}
        <Privacy />
      </div>
      <div className="is-hidden-tablet has-text-centered">
        <div className="pb-1">
          <Licence />
        </div>
        <div>
          <Privacy />
        </div>
      </div>
    </footer>
  );
};
