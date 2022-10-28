import React, {useEffect, useState} from "react";
import './Auth.scss';
import M from 'materialize-css';
import Form from "../../components/Form/Form";
import axios from "axios";

export default function Auth() {

  const baseURL = 'http://localhost:3001/';
  // const [registration, setRegistration] = useState(false);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState("");
  const [registerLogin, setRegisterLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    M.AutoInit();    
    document.title = "Auth";
  })

  const confirmPasswordInputChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
    if(registerPassword !== event.target.value) {
      event.target.className = "invalid";
    } else {
      event.target.className = "valid";
    }
  }

  const btnSubmitHandler = () => {
    // axios post request
  }

  const btnRegisterClickHandler = async () => {
    if(email && registerLogin && registerPassword && registerPassword === confirmPassword) {
      await axios.post(baseURL + 'auth/register', {
        email: email,
        login: registerLogin,
        password: registerPassword,
        confirmPassword: confirmPassword
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <main className="Auth">
      <h1>Auth</h1>
      <div className="row s12 m7">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s6"><a className="active" href="#login">Log in</a></li>
            <li className="tab col s6"><a href="#registration">Registration</a></li>
          </ul>
        </div>
        <div id="login" className="col s12">
          <Form 
            registration={false}
            btnName = {'Enter'}
            loginInputChange = {(event) => setLogin(event.target.value)}
            loginValue = {login}
            passwordInputChange = {(event) => setPassword(event.target.value)}
            passwordValue = {password}
            btnClick = {btnSubmitHandler}
          />
        </div>
        <div id="registration" className="col m8 s12 offset-m2">
          <Form 
            registration={true}
            btnName = {'Registration'}
            emailInputChange = {(event) => setEmail(event.target.value)}
            emailValue = {email}
            loginInputChange = {(event) => setRegisterLogin(event.target.value)}
            loginValue = {registerLogin}
            passwordInputChange = {(event) => setRegisterPassword(event.target.value)}
            passwordValue = {registerPassword}
            confirmInputChange = {(event) => confirmPasswordInputChangeHandler(event)}
            confrimPasswordValue = {confirmPassword}
            btnClick = {btnRegisterClickHandler}
          />
        </div>
      </div>
    </main>
  )
}