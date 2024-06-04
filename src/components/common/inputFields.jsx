const InputFields = ({ name, value, onChange, type, label, error }) => {
  return (
    <div className="form-group m-2">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default InputFields;
