import React from "react";
import Button from "react-bootstrap/Button";

const BoardShapeScreen = props => {
  // console.log("BoardShapeScreen, props: ", props);
  const { changeBoardShape, choices } = props;
  let shapes = [];
  choices.forEach(choice => {
    shapes.push(
      <Button
        key={choice.size}
        className="deck"
        onClick={() => changeBoardShape(choice.size)}
        style={{ fontSize: "3em", width: "3em", height: "3em" }}
      >
        {choice.size}
      </Button>
    );
  });

  return <div className="screen"> {shapes.reverse()} </div>;
};

const VocabScreen = props => {
  // console.log("VocabScreen, props: ", props);
  const { changeVocab, choices } = props;
  let decks = [];
  choices.forEach(choice =>
    decks.push(
      <Button
        key={choice.name}
        className="deck"
        onClick={() => changeVocab(choice.name)}
        style={{ fontSize: "3em", width: "auto", height: "3em" }}
      >
        {choice.name}
      </Button>
    )
  );

  return <div className="screen"> {decks} </div>;
};

export { BoardShapeScreen, VocabScreen };
