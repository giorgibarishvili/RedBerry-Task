function CheckBox({ text }) {
  return (
    <div className="form-check checkbox-wrapper">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {text}
      </label>
    </div>
  );
}
export default CheckBox;
