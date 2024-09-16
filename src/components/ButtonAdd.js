import "../styles/ButtonAdd.css";
import { ReactComponent as PlusOrange } from "../images/plus-orange.svg";
import { ReactComponent as PlusWhite } from "../images/plus-white.svg";

function ButtonAdd({ text, colored }) {
  return (
    <button
      className="btn-add mx-3"
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
