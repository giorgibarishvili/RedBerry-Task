function Input({ label, state, setState, type }) {
  return (
    <div className="   pb-5 col-5 row-column">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className={`form-control${!state ? " is-invalid" : ""}`}
        id=""
        value={state}
        placeholder=""
        onChange={(e) => setState(e.target.value)}
        autoComplete="off"
        required
      />

      {!state && (
        <span className="text-danger error-validation-text">mandatory</span>
      )}
    </div>
  );
}
export default Input;
