import React from "react";
import { ImSpades } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { GiDiamonds, GiClubs } from "react-icons/gi";
import "./Card.css";
const Card = ({ cardName, cardType, key }) => {
  console.log("line 7", cardName, cardType);
  return (
    <div className="card-div" key={key}>
      <div>
        <h1
          style={{
            color:
              cardType == "diamond" || cardType == "heart" ? "red" : "#000",
          }}
        >
          {cardName}
        </h1>
      </div>
      <div className="card-center">
        {cardType == "spades" ? (
          <ImSpades size="40px" />
        ) : cardType == "heart" ? (
          <FaHeart size="40px" color="red" />
        ) : cardType == "diamond" ? (
          <GiDiamonds size="40px" color="red" />
        ) : (
          <GiClubs size="40px" />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Card;
