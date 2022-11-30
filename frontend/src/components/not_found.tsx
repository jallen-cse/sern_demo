
import { useLocation } from "react-router-dom"

/**
 * Displays 404 error with absent page message.
 */
export default function NotFound() {
  const location = useLocation();
  return (
    <div className="page-content">
      <h1>404</h1>
      <p>There is no page for {location.pathname}.</p>
    </div>
  );
}