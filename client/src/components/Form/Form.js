import React from "react";
import './Form.scss';

export default function Form(props) {
  return (
    <>
    {/* // <form className="Form"> action="/auth/login" method="POST"> */}
      {props.registration ?
        <div className="input-field col s12">
          <input 
            id="email" 
            name="email" 
            type="email" 
            className="validate"
            onChange={props.emailInputChange}
            required 
          />
          <label htmlFor="email">Email: </label>
          <span className="helper-text" data-error="Email must be correct"></span>
        </div>
      : null}
      <div className="input-field col s12">
        <input 
          id={props.registration ? "registration-login" : "login"} 
          name={props.registration ? "registration-login" : "login"} 
          type="text" 
          minLength={3} 
          value = {props.loginValue}
          onChange = {props.loginInputChange}
          className="validate"
          required 
        />
        <label htmlFor={props.registration ? "registration-login" : "login"}>{props.registration ? "Login: " : "Login or email:"}</label>
        <span className="helper-text" data-error="The field must be filled and contain more than 2 symbols"></span>
      </div>
      <div className="input-field col s12">
        <input 
          id={props.registration ? "registration-password" : "password"} 
          name={props.registration ? "registration-password" : "password"} 
          type="password" 
          onChange={props.passwordInputChange}
          className="validate"
          minLength={"6"} 
          required 
        />
        <label htmlFor={props.registration ? "registration-password" : "password"}>Password: </label>
        <span className="helper-text" data-error="The field must be contain more than 6 symbols"></span>
      </div>
      {props.registration ?
        <div className="input-field col s12">
          <input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password"
            onChange = {props.confirmInputChange}
            className="validate" 
            required 
          />
          <label htmlFor="confirmPassword">Confirm password: </label>
          <span className="helper-text" data-error="Passwords do not match"></span>
        </div>
      : null}
      {/* <input type="hidden" name="_csrf" value="{{csrf}}" /> */}
      <button 
        className="btn btn-pimary col s5 m4 offset-m8 offset-s7"
        // type="submit"
        onClick={props.btnClick}
        // onСlick={props.btnClick}
      >{props.btnName}</button>
    {/* </form> */}
    </>
  )
}