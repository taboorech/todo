import React from "react";
import './Exercises.scss'

export default function Exercises(props) {
  return (
    <div className={'Exercises z-depth-3'}>
      {props.children.length > 0 ? props.children : <h3>No tasks</h3>}
    </div>
  )
}