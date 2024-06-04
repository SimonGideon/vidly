import { useState } from "react";
import InputFields from "./common/inputFields";
import Joi from "joi-browser";
import { schema } from "joi-browser";
const LoginForm = () => {
  // state to store username and password
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    error: "",
  });

  // Joi schema to validate the form
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(credentials, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }
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
          label={"Username"}
          error={credentials.error && credentials.error.username}
        />
        <InputFields
          name="password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          label={"Password"}
          error={credentials.error && credentials.error.password}
        />
        <button className="btn btn-primary button m-2">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
