import React from "react";
import './ListTitle.scss'
import { Button } from "react-materialize";
import { useNavigate } from "react-router-dom";

export function ListTitle(props) {

  let navigation = useNavigate();

  let blockStyles = [
    "row"
  ]

  if(!props.editListTitle) {
    blockStyles.push("close");
  }

  return (
    <div className="row ListTitle" onDoubleClick={props.onDblClick}>
      <div className="title col s12 m12">
        <div className="input-field col s12 m12">
          <input 
            value={props.value} 
            className = {"titleInput"}
            type={"text"}
            style = {{fontSize: 25 + "px"}}
            onChange={props.inputChange} 
            disabled = {!props.editListTitle ? "disabled" : false}
            // disabled={props.disabled ? "disabled" : false} 
          />
        </div>
      </div>
      <div className={"block col s12"}>
        <div className={blockStyles.join(' ')}>
          <Button 
            node="button" 
            waves="light"
            className="remove red col m3 s6 offset-s6 offset-m1"
            onClick={() => { 
              if(props.canDelete) {
                props.onDeleteButtonClick(); 
                navigation('/' + props.anotherList);
              }
            }}
            disabled={!props.canDelete ? true : false}
          >Delete</Button>
          <Button 
            node="button" 
            waves="light" 
            className="col m3 s6 offset-s6 offset-m4"
            onClick={props.onApplyButtonClick}
          >Save</Button>
        </div>
      </div>
    </div>
  )
}