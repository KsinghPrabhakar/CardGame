import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./component/Card";
const App = () => {
  const [allCards, setAllCards] = useState([]);
  const colors = ["spades", "heart", "diamond", "club"];
  const card = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  const getRandomValue = (multiplyBy) => {
    const random = Math.floor(Math.random() * multiplyBy);
    return random;
  };
  const shuffleCards = (cards) => {
    let shuffledCard = [];
    let multiplyBy = 51;

    while (multiplyBy > 0) {
      let rv = getRandomValue(multiplyBy);
      shuffledCard.push(cards[rv]);
      cards = cards.filter((card, index) => index !== rv);
      multiplyBy -= 1;
    }
    shuffledCard.push(cards[0]);
    setAllCards(shuffledCard);
  };

  const generateAllCards = () => {
    let card52 = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        let obj = {};
        obj.cardName = card[j];
        obj.cardColor = colors[i];
        card52.push(obj);
      }
    }

    shuffleCards(card52);
  };

  useEffect(() => {
    generateAllCards();
  }, []);

  console.log("myCards", allCards);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {allCards.map((item, index) => {
        console.log("iteme is", item?.cardName, item?.cardColor);
        return (
          <Card
            cardName={item?.cardName}
            cardType={item?.cardColor}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default App;
