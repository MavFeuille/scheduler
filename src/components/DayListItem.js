import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

const formatSpots = (spots) => {
  if (!spots) {
    return "no spots remaining";
  } 
  
  if (spots === 1) {
    return `${spots} spot remaining`;
  } else {
    return `${spots} spots remaining`;
  }
}

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0
  })

  return (
    <li className="day-list__item" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}