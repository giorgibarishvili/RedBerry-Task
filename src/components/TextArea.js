import { useState } from "react";
import { ReactComponent as Confirm } from "../images/confirm-icon.svg";

function TextArea({ label, state, setState, className, spanText }) {
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setState(e.target.value);
    if (!touched) {
      setTouched(true);
    }
  };
  const isInvalid = touched && state.length < 5;
  return (
    <div className="form-floating input-frame pb-3">
      <textarea
        className={`input-field textarea form-floating form-control ${className} ${
          isInvalid ? "is-invalid" : ""
        }
        }`}
        id="floatingInput"
        placeholder=""
        value={state}
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="floatingInput">{label}</label>
      {spanText && (
        <span
          className={`d-flex mt-2 ${
            isInvalid
              ? "two-symb-error"
              : state.length >= 5
              ? "two-symb-done"
              : ""
          }`}
        >
          <Confirm /> {spanText}
        </span>
      )}
    </div>
  );
}
export default TextArea;
