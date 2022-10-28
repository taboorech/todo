import React from "react";
import './MenuToggle.scss'

export default function MenuToggle(props) {
  let styles = [
    "fa",
    "MenuToggle"    
  ]

  if(!props.isOpen) {
    styles.push("fa-bars");
  } else {
    styles.push("fa-times");
    styles.push("open");
  }

  return (
    <i className={styles.join(' ')} onClick={props.onClick} />
  )   
}