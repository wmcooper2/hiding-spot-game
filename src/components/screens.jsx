import React from "react";
import Button from "react-bootstrap/Button";

const SettingsScreen = props => {
  // console.log("SettingsScreen, props: ", props);
  const { updateBoard, choices } = props;
  let shapes = [];
  choices.forEach(choice => {
    shapes.push(
      <Button
        key={choice.size}
        className="deck"
        onClick={() => updateBoard(choice.size)}
        style={{ fontSize: "3em", width: "3em", height: "3em" }}
      >
        {choice.size}
      </Button>
    );
  });

  return <div className="screen"> {shapes.reverse()} </div>;
};

const DeckScreen = props => {
  // console.log("DeckScreen, props: ", props);
  const { updateBoard, choices } = props;
  let decks = [];
  choices.forEach(choice =>
    decks.push(
      <Button
        key={choice.name}
        className="deck"
        onClick={() => updateBoard(choice.name)}
        style={{ fontSize: "3em", width: "auto", height: "3em" }}
      >
        {choice.name}
      </Button>
    )
  );

  return <div className="screen"> {decks} </div>;
};

export { SettingsScreen, DeckScreen };
