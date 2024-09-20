import "../styles/Button.css";
import { ReactComponent as PlusOrange } from "../images/plus-orange.svg";
import { ReactComponent as PlusWhite } from "../images/plus-white.svg";

function ButtonAdd({ text, colored, click }) {
  return (
    <button
      className="btn-default btn-add mx-3"
      onClick={click}
      style={{
        backgroundColor: colored,
        color: colored === "#F93B1D" ? "#ffffff" : "#F93B1D",
      }}
    >
      {colored === "#F93B1D" ? <PlusWhite /> : <PlusOrange />}
      {text}
    </button>
  );
}
export default ButtonAdd;
