import React from 'react'
import { useEffect } from 'react'
import './Table.css'
import Card from './Card'
import { useState } from 'react'
const Table = ({ totalPlayers, playerCards, reStartGame, restartGameHandler }) => {
    // const [orders, setOrder]
    const [winner, setWinner] = useState('');
    const sortArr = (arr) => { // [9, 7, 6]
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j
                }
            }
            let temp = arr[i] // 9
            arr[i] = arr[minIndex] // 6
            arr[minIndex] = temp
        }

        return arr
    }
    const isTrail = (player) => { // [{}, {}, {}]
        let card1 = player[0]?.cardName;
        let card2 = player[1]?.cardName;
        let card3 = player[2]?.cardName;
        if (card1 === card2 && card1 === card3) {
            return { cardType: 'trail', highestCard: card1 }
        }
        return false
    }

    const isColor = (player) => {
        let card1Color = player[0]?.cardColor;
        let card2Color = player[1]?.cardColor;
        let card3Color = player[2]?.cardColor;

        let card1Name = player[0]?.cardName;
        let card2Name = player[1]?.cardName;
        let card3Name = player[2]?.cardName;

        let cards = sortArr([card1Name, card2Name, card3Name])

        if (card1Color === card2Color && card1Color === card3Color) {
            return { cardType: 'color', highestCard: cards[2], allCards: cards }
        }
        return false
    }
    const isSequence = (player) => {
        let card1Name = player[0]?.cardName;
        let card2Name = player[1]?.cardName;
        let card3Name = player[2]?.cardName;

        let myCards = sortArr([card1Name, card2Name, card3Name])

        let isSeq = false;
        let isColor = false;

        if (myCards[2] - myCards[0] === 2 && myCards[2] - myCards[1] === 1 && myCards[1] - myCards[0] === 1) {
            isSeq = true;
        }
        if (myCards[0] === 2 && myCards[1] === 3 && myCards === 14) {
            isSeq = true;
        }
        if (isSeq) {
            return { cardType: 'sequence', highestCard: myCards[2] }
        }
        return false
    }

    const isPureSequence = (player) => {
        let isSeq = isSequence(player);
        if (isSeq) {
            let card1Color = player[0]?.cardColor;
            let card2Color = player[1]?.cardColor;
            let card3Color = player[2]?.cardColor;

            if (card1Color === card2Color && card1Color === card3Color) {
                return { cardType: 'pureSequence', highestCard: isSeq?.highestCard }
            }
        }
        return false
    }

    const isDoubleCard = (player) => {
        let card1Name = player[0]?.cardName;
        let card2Name = player[1]?.cardName;
        let card3Name = player[2]?.cardName;

        let cards = sortArr([card1Name, card2Name, card3Name])

        if (cards[1] === cards[0] || cards[1] === cards[2]) {
            return { cardType: 'double', highestCard: cards[1], allCards: cards }
        }
        return false
    }


    const checkPlayerCards = (player) => {
        let trail = isTrail(player);

        console.log('trail',trail);
        if(trail){
            return trail;
        }


        let pureSeq = isPureSequence(player);
        console.log('pureSeq',pureSeq);

        if(pureSeq){
            return pureSeq
        }

        let seq = isSequence(player);
        console.log('seq',seq);

        if(seq){
            return seq
        }

        let color = isColor(player);
        console.log('color',color);

        if(color){
            return color
        }

        let double = isDoubleCard(player);
        console.log('double', double);
        if(double){
            return double;
        }

        let card1Name = player[0]?.cardName;
        let card2Name = player[1]?.cardName;
        let card3Name = player[2]?.cardName;

        let cards = sortArr([card1Name, card2Name, card3Name]);
        console.log('sorted card = ', cards);
        return { cardType: 'highCard', highestCard: cards[2], allCards: cards }
    }

    const getIndexNum = (data) => {
        let orders = ['highCard', 'double', 'color', 'sequence', 'pureSequence', 'trail']
        for(let i=0; i<orders.length; i++){
            if(orders[i] === data?.cardType){
                return i;
            }
        }
    }
    const compareCardsHandler = () => {
        let p1Data = playerCards[0];
        let p2Data = playerCards[1];
        console.log('p1 data', p1Data, 'p2Data', p2Data);

        // Trail => K K K 
        // Pure Sequence
        // Sequence 
        // Color
        // Double 
        // High Cards

        let p1Check = checkPlayerCards(p1Data)
        let p2Check = checkPlayerCards(p2Data)
        console.log('p1 and p2 check', p1Check, p2Check);

        let p1Value = getIndexNum(p1Check)
        let p2Value = getIndexNum(p2Check)

        if(p1Value>p2Value){
            setWinner('1')
        }else{
            setWinner('2')
        }

        if(p1Value === p2Value){
            if(p1Check?.highestCard > p2Check?.highestCard){
                setWinner('1')
            }else{
                setWinner('2')
            }
        }
    }
    return (
        <div className='table-container'>
                <h2>Player 1</h2>
            <div className="player">
                {
                    playerCards[0]?.map((card, index) => {
                        return(
                            <Card
                                cardName={card?.cardName}
                                cardType={card?.cardColor}
                                key={index}
                            />
                        )
                    } )
                }
            </div>
            <div className="operations">
                <button onClick={compareCardsHandler}>See Winner</button>
                {winner && <h3>Player {winner} is winner</h3>}
                <button onClick={ () => {
                    setWinner('')
                    restartGameHandler(!reStartGame)
                }}>Restart</button>
            </div>
                <h2>Player 2</h2>
            <div className="player">
                {
                    playerCards[1]?.map((card, index) => {
                        return(
                            <Card
                                cardName={card?.cardName}
                                cardType={card?.cardColor}
                                key={index}
                            />
                        )
                    } )
                }
            </div>
        </div>
    )
}

export default Table