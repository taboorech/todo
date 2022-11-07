import React, { useEffect } from "react";
import M from 'materialize-css';

export default function Input(props) {

  useEffect(() => {
    var datepicker = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepicker, {
      autoClose: true,
      format: "dd.mm.yyyy",
      onClose: () => props.onChangeDateInput(datepicker[0].value)
    });
  }, [props]);

  useEffect(() => {
    M.updateTextFields();
  })

  return(
    <div className="Input">
      <div className="row">
        <div className="input-field col s12 m10 offset-m1">            
          <input value={props.value} id={props.htmlFor} type={props.type} onChange={props.onChange} disabled={props.disabled ? true : false} />
          <label htmlFor={props.htmlFor}>{props.labelTitle}</label>
        </div>
        {props.dateLabelTitle ?
        <div className="input-field col s12 m10 offset-m1">          
          <input type="text" id={props.htmlForDate} onChange={props.onChangeDateInput} value={props.dateValue} className="datepicker"/>
          <label htmlFor={props.htmlForDate}>{props.dateLabelTitle}</label>
        </div> : null}
        {props.descriptionLabel ?
        <div className="input-field col s12 m10 offset-m1">            
          <input value={props.descriptionValue} id={'description'} type={'text'} onChange={props.onDescriptionInputChange} />
          <label htmlFor={'description'}>{props.descriptionLabel}</label>
        </div> : null}
        {props.btnName ? 
        <div className="input-field col s1 m1 offset-m10 offset-s9">
          <button className="waves-effect waves-light btn" onClick={props.onButtonClick}>{props.btnName}</button>
        </div> : null}
      </div>
    </div>
  )
}