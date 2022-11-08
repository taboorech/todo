import React from "react";
import './Exercise.scss'
import { CSSTransition } from 'react-transition-group';
import {Button} from 'react-materialize';

export default function Exercise(props) {
  let titleStyles = [
      
  ]

  let descriptionBlockStyles = [
    "row", 
    "additionalInfo"
  ]

  if(props.complete) {
    titleStyles.push("complete");
  }
  return(
    <div className={'Exercise'}>
      <div onDoubleClick={props.onDblClick} onClick={props.onClick} listnumber={props.listNumber}>
        <p>
          <label>
            <input type="checkbox" value={props.listNumber} checked={props.complete ? "checked" : false} onChange={props.onCheckboxesChecked} />
            <span>{}</span>
          </label>
        </p>
        <div>
          <div className="title" listnumber={props.listNumber}>
            <h4 className={titleStyles.join(' ')} listnumber={props.listNumber}>{props.title}</h4>
          </div>
          {props.date ?
          <div className="date" listnumber={props.listNumber}>Must to do at: {props.date}</div> : null}
        </div>
      </div>
      <div>
        <CSSTransition in={props.descriptionBlockOpen} timeout={{
          enter: 700,
          exit: 700
        }}>
          <div className={descriptionBlockStyles.join(' ')}>
            <div className="desriptionBlock">
              <p className="description">{props.description}</p>
            </div>
            <div className="row desciptionButtonBlock">
              <Button 
                onClick={props.deleteButtonClick} 
                listnumber={props.listNumber} 
                node="button" 
                waves="light" 
                className="col red m3 s6 offset-s6"
              >Delete</Button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}