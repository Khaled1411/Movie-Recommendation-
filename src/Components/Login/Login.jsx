import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import styles from "./Login.module.css";

export default function Login(props) {
  let [user, setUser] = useState({
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

  const navigateToRegister = useNavigate();
  function goToRegister() {
    navigateToRegister("/register");
  }

  function validateForm() {
    const schema = Joi.object({
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
        let { data } = await axios.post('http://localhost:5000/api/auth/login', user);
        if (data.data.token) {
          localStorage.setItem("userToken", data.data.token);
          props.saveUserData();
          goToHome();
        }
      } catch (error) {
        setErrorMsg(error.response?.data?.message || 'Login failed');
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
          <h2>Login Form</h2>
          {errorsList.map((error, index) => (
            <div key={index} className="alert alert-danger">
              {error.message}
            </div>
          ))}
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <form onSubmit={submitFormData}>
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
              {loading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
            </button>
            <div className="clearfix"></div>
          </form>
          <div className="d-flex align-items-center">
            <p className="text-white-50">New to Noxe?</p>
            <p
              className={`fs-4 mx-1 ${styles.registerbutton}`}
              onClick={goToRegister}
            >
              Register now
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
