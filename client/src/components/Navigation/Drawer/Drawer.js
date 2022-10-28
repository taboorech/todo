import React, {useState} from "react";
import './Drawer.scss'
import Backdrop from "../../UI/Backdrop/Backdrop";
// import { NavLink } from "react-router-dom";

export default function Drawer(props) {

  const [createFormOpen, setFormOpen] = useState(false);

  let styles = [
    "Drawer"    
  ]

  if(!props.isOpen) {
    styles.push("close")
  }

  let createFormStyles = [
    "createListBlock",
  ]

  if(!createFormOpen) {
    createFormStyles.push("close");
  }

  const addButtonClickHandler = () => {
    setFormOpen(!createFormOpen);
  }

  return(
    <>
      <div className={styles.join(' ')}>
        <h4>
          Lists:
        </h4>
        <ul>        
          {props.children}
        </ul>
        <div className={createFormStyles.join(' ')}>
          <button onClick={addButtonClickHandler} className="btn-floating btn-large waves-effect waves-light red addListButton"><i className="material-icons">add</i></button>
          <div className={"row formBlock"}>
            <div className="input-field col s12">
              <input 
                value={props.createListInputValue}
                onChange = {props.createListInputChange}
                id="listName" 
                type="text"
              />
              <label htmlFor="listName">List Name</label>
            </div>
            <div className="input-field col s12">
              <button 
                className="waves-effect waves-light btn col s4 m4 offset-m8 offset-s8"
                onClick={() => {
                  props.createListButtonClick(); 
                  setFormOpen(!createFormOpen)
                }}
              >{'Create'}</button>
            </div>
          </div>
        </div>
      </div>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </>
  )
}