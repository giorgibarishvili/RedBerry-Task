import "../../styles/Navbar.css";
import { ReactComponent as Logo } from "../../images/redberry-logo.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="container">
        <Logo
        style={{cursor: "pointer"}}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
