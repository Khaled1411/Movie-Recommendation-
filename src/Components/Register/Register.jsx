import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Register() {
  let [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  let [errorMsg, setErrorMsg] = useState("");
  let [errorsList, setErrorsList] = useState([]);
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  function goToHome() {
    navigate("/home");
  }

  function validateForm() {
    const schema = Joi.object({
      name: Joi.string().alphanum().required().min(3).max(30),
      phone: Joi.string()
        .pattern(new RegExp(/^[0-9]{11}$/))
        .required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org"] }, minDomainSegments: 2 })
        .required(),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function submitFormData(e) {
    e.preventDefault();
    setLoading(true);
    let validateResponse = validateForm();
    if (validateResponse.error) {
      setErrorsList(validateResponse.error.details);
    } else {
      try {
        let { data } = await axios.post('http://localhost:5000/api/auth/register', user);
        if (data.data.token) {
          localStorage.setItem("userToken", data.data.token);
          goToHome();
        }
      } catch (error) {
        setErrorMsg(error.response?.data?.message || 'Registration failed');
      }
    }
    setLoading(false);
  }

  function getFormValue(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  return (
    <>
      <div className="container">
        <div className="my-5 w-75 m-auto">
          <h2>Registeration Form</h2>
          {errorsList.map((error, index) => (
            <div key={index} className="alert alert-danger">
              {error.message}
            </div>
          ))}
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <form onSubmit={submitFormData}>
            <div className="input-gp my-2">
              <label htmlFor="Name">Name:</label>
              <input
                onChange={getFormValue}
                placeholder="Ex: htlr"
                type="text"
                name="name"
                className="form-control"
              />
            </div>
            <div className="input-gp my-2">
              <label htmlFor="Phone">Phone:</label>
              <input
                onChange={getFormValue}
                type="number"
                name="phone"
                placeholder="Ex: 01023456789"
                className="form-control"
              />
            </div>
            <div className="input-gp my-2">
              <label htmlFor="email">Email:</label>
              <input
                onChange={getFormValue}
                type="email"
                name="email"
                placeholder="Ex: htlr@gmail.com"
                className="form-control"
              />
            </div>
            <div className="input-gp my-2">
              <label htmlFor="password">Password:</label>
              <input
                onChange={getFormValue}
                type="password"
                name="password"
                className="form-control"
              />
            </div>
            <button className="btn btn-info float-end" type="submit">
              {loading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
            </button>
            <div className="clear-fix"></div>
          </form>
        </div>
      </div>
    </>
  );
}
