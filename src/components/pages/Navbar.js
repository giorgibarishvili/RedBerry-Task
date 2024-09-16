import "../../styles/Navbar.css";
import { ReactComponent as Logo } from "../../images/redberry-logo.svg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <Logo />
      </div>
    </div>
  );
}

export default Navbar;
