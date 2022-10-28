import React, { Component } from "react";
import M from 'materialize-css';

class Input extends Component {

  componentDidMount() {
    var datepicker = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepicker, {
      autoClose: true,
      format: "dd.mm.yyyy",
      onClose: () => this.props.onChangeDateInput(datepicker[0].value)
    });
  }

  componentDidUpdate() {
    M.updateTextFields();
  }

  render() {
    return (
      <div className="Input">
        <div className="row">
          <div className="input-field col s12 m10 offset-m1">            
            <input value={this.props.value} id={this.props.htmlFor} type={this.props.type} onChange={this.props.onChange} disabled={this.props.disabled ? true : false} />
            <label htmlFor={this.props.htmlFor}>{this.props.labelTitle}</label>
          </div>
          {this.props.dateLabelTitle ?
          <div className="input-field col s12 m10 offset-m1">          
            <input type="text" id={this.props.htmlForDate} onChange={this.props.onChangeDateInput} value={this.props.dateValue} className="datepicker"/>
            <label htmlFor={this.props.htmlForDate}>{this.props.dateLabelTitle}</label>
          </div> : null}
          {this.props.descriptionLabel ?
          <div className="input-field col s12 m10 offset-m1">            
            <input value={this.props.descriptionValue} id={'description'} type={'text'} onChange={this.props.onDescriptionInputChange} />
            <label htmlFor={'description'}>{this.props.descriptionLabel}</label>
          </div> : null}
          {this.props.btnName ? 
          <div className="input-field col s1 m1 offset-m10 offset-s9">
            <button className="waves-effect waves-light btn" onClick={this.props.onButtonClick}>{this.props.btnName}</button>
          </div> : null}
        </div>
      </div>
    )
  }
}

export default Input;