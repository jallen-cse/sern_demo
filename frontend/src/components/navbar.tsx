
import { Link, LinkProps, useLocation } from "react-router-dom";

/**
 * A link with child text whose style changes depending
 * on the current react router location.
 */
function MaybeActiveLink(props: LinkProps) {
  const location = useLocation();
  var cn: string;
  var ac: "page" | undefined;
  if (props.to === location.pathname) {
    cn = "nav-link active";
    ac = "page";
  } else {
    cn = "nav-link";
    ac = undefined;
  }
  return <Link className={cn} aria-current={ac} to={props.to}>{props.children}</Link>;
}

/**
 * The main application navbar.
 */
export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SERN Demo</Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <MaybeActiveLink to="/home">Home</MaybeActiveLink>
            </li>
            <li className="nav-item">
              <MaybeActiveLink to="/jobs/search">Search Jobs</MaybeActiveLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}