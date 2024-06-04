const InputFields = ({ name, value, onChange, type }) => {
  return (
    <div className="form-group m-2">
      <label htmlFor="username">Username</label>
      <input
        id={name}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        className="form-control"
      />
    </div>
  );
};

export default InputFields;
