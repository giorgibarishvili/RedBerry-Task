function TextArea({ label, state, setState, className }) {
  return (
    <div className="form-floating input-frame pb-3">
      <textarea
        className={`input-field textarea form-floating form-control ${className} ${
          !state ? " is-invalid" : ""
        }`}
        id="floatingInput"
        placeholder=""
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      ></textarea>
      <label htmlFor="floatingInput">{label}</label>
      {!state && (
        <span className="text-danger error-validation-text">mandatory</span>
      )}
    </div>
  );
}
export default TextArea;
