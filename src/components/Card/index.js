import React from "react";
import "./card.css";

const Cards = props => (
  <div className="card" onClick={() => props.clickedTank(props.id)}>
    <div className="img-container">
      <img alt={props.tankName} src={props.image} />
      <div className="overlay">
        <div className="text">
          {props.tankName} 
        </div>
      </div>
    </div>
  </div>
);

export default Cards;