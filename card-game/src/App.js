import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Card from "./component/Card";
import Table from "./component/Table";
const App = () => {
  const [allCards, setAllCards] = useState([]); // [{cardName: 'A', cardColor: 'spades}, ... {}]
  const [playerCards, setPlayerCards] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(2);
  const [reStartGame, setReStartGame] = useState(false)
  const colors = ["spades", "heart", "diamond", "club"];
  const card = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
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

  const distributeCards = () => {
    let ditributedCards = [] //[[{}, {}, {}], [{}, {}, {}]]
    let startingIndex = 0;
    let endingIndex = 3;
    for(let i=0; i<totalPlayers; i++){
      const singlePlayerCards = allCards.slice(startingIndex, endingIndex);
      ditributedCards.push(singlePlayerCards);
      startingIndex += 3;
      endingIndex += 3
    }
    setPlayerCards(ditributedCards)
  }

  useEffect(() => {
    if(allCards && allCards.length){
      distributeCards();
    }
  },[allCards])

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
  }, [reStartGame]);

  const restartGameHandler = useCallback((start) => {
    setReStartGame(start)
  },[])
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* {allCards.map((item, index) => {
        return (
          <Card
            cardName={item?.cardName}
            cardType={item?.cardColor}
            key={index}
          />
        );
      })} */}
      <Table totalPlayers={totalPlayers} playerCards={playerCards} reStartGame={reStartGame} restartGameHandler={restartGameHandler} />
    </div>
  );
};

export default App;
