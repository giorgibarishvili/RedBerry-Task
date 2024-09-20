function CheckBox({ text, change, isSelected, id }) {
  return (
    <div className="form-check checkbox-wrapper">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={id}
        onChange={change}
        checked={isSelected}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault" for={id}>
        {text}
      </label>
    </div>
  );
}
export default CheckBox;
