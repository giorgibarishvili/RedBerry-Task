function CheckBox({ text, change, isSelected }) {
  return (
    <div className="form-check checkbox-wrapper">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        onChange={change}
        checked={isSelected}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {text}
      </label>
    </div>
  );
}
export default CheckBox;
