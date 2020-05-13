import React from "react";
import ReactCardFlip from "react-card-flip";

const FlipCardBack = (props) => {
  const { cardID, handleClick, hidingSpot, cardSize } = props;
  const item = cardID === hidingSpot ? "YES" : "NO";
  return (
    <div
      className="card card-front"
      width={cardSize}
      height={cardSize}
      onClick={() => handleClick(cardID)}
    >
      {item}
    </div>
  );
};

const FlipCardFront = (props) => {
  const { card, cardID, handleClick, cardSize } = props;
  console.log(card.image);
  return (
    <img
      onClick={() => handleClick(cardID)}
      className="card card-back"
      src={process.env.PUBLIC_URL + card.image}
      alt="card"
      width={cardSize}
      height={cardSize}
    ></img>
  );
};

const FlipCard = (props) => {
  const { card } = props;
  return (
    <ReactCardFlip isFlipped={card.flipped} flipDirection="horizontal">
      <FlipCardFront {...props} />
      <FlipCardBack {...props} />
    </ReactCardFlip>
  );
};

const Row = (props) => {
  const { boardShape, deck, rowID, handleClick, hidingSpot, cardSize } = props;

  let rowCards = [];
  for (let i = 0; i < boardShape.x; i++) {
    rowCards.push(
      <FlipCard
        key={boardShape.x * rowID + i}
        cardID={boardShape.x * rowID + i}
        card={deck[boardShape.x * rowID + i]}
        hiddenItem={deck[boardShape.x * rowID + i].hiddenItem}
        handleClick={handleClick}
        hidingSpot={hidingSpot}
        cardSize={cardSize}
      />
    );
  }
  return <div className="row">{rowCards}</div>;
};

const BoardGame = (props) => {
  const { boardShape, deck } = props;
  let rows = [];
  for (let i = 0; i < boardShape.y; i++) {
    rows.push(
      <Row key={i} deck={deck} boardShape={boardShape} {...props} rowID={i} />
    );
  }
  return <div className="board">{rows}</div>;
};

export default BoardGame;
