import React, { useState } from "react";
import { ReactComponent as Confirm } from "../images/confirm-icon.svg";

function Input({
  label,
  state,
  setState,
  type,
  className,
  required,
  spanText,
}) {
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setState(e.target.value);
    if (!touched) {
      setTouched(true); // Mark as touched when user types
    }
  };
  const isInvalid = touched && (state.length < 2);
  return (
    <div className="pb-5 col-5 row-column">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className={`form-control ${className} ${isInvalid ? "is-invalid" : ""}`}
        value={state}
        placeholder=""
        onChange={handleChange}
        onBlur={() => setTouched(true)} // Mark as touched when input loses focus
        autoComplete="off"
        required={required}
      />

      {/* {touched && !state && ( */}
      {spanText && (
        <span className={`${isInvalid ? "text-danger error-validation-text" : "valid-feedback"}`}>
          <Confirm /> {spanText}
        </span>
      )}
      {/* )} */}
    </div>
  );
}

export default Input;
