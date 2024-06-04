import { useState } from "react";
import InputFields from "./common/inputFields";
const LoginForm = () => {
  // state to store username and password
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    error: "",
  });

  const validate = () => {
    const errors = {};
    if (credentials.username.trim() === "")
      errors.username = "Username is required";
    if (credentials.password.trim() === "")
      errors.password = "Password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setCredentials({ ...credentials, error: errors });
    console.log("Submitted");
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <InputFields
          name="username"
          value={credentials.username}
          onChange={handleChange}
          type="text"
        />
        <InputFields
          name="password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
        />
        <button className="btn btn-primary button m-2">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
