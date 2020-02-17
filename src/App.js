import React from "react";
import BoardGame from "./components/boardgame";
import ControlPanel from "./components/controlpanel";
import { boardShapes, defaultShape } from "./boardshapes";
import { SettingsScreen, DeckScreen } from "./components/screens";
import { testDeck, fruits, animals, colors } from "./decks";
import { HashRouter, Route } from "react-router-dom";
import "./App.sass";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardShape: defaultShape,
      deck: testDeck,
      deckName: "testdeck",
      currentScreen: "game"
    };

    this.deckChoices = [
      { name: "colors", deck: colors },
      { name: "fruits", deck: fruits },
      { name: "animals", deck: animals },
      { name: "testdeck", deck: testDeck }
    ];

    this.cardClick = this.cardClick.bind(this);
    this.changeHidingSpot = this.changeHidingSpot.bind(this);
    this.changeShape = this.changeShape.bind(this);
    this.changeDeck = this.changeDeck.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
  }

  cardClick = props => {
    // console.log("cardClick: ", props);
    let deck = this.state.deck.slice();
    // console.log("you chose: ", deck[props]);
    //toggle its flipped value
    deck[props].flipped = !deck[props].flipped;
    this.setState({
      deck: deck
    });
    // console.log("after click: ", this.state.deck);
  };

  changeHidingSpot = props => {
    console.log("changeHidingSpot");
  };

  updateBoard = props => {
    // console.log("updateBoard, props: ", props);
    //defaults for this function
    let deck = this.deckChoices.filter(choice => choice.name === "testdeck");
    let deckName = this.state.deckName;
    let shape = this.state.boardShape;

    //only change the state of the chosen prop
    if (typeof props === "string") {
      //change deck
      deck = this.deckChoices.filter(choice => choice.name === props);
      deckName = deck[0].name;
    } else {
      //change shape
      shape = boardShapes.filter(item => item.size === props);
      shape = shape[0];
    }

    //copy so you don't ruin the original
    let deckCopy = deck[0].deck.slice();
    // console.log("deckCopy: ", deckCopy);

    // randomize the final deck of deck
    let randomOrder = [];
    const randomLimit = deckCopy.length;
    for (let i = 0; i < randomLimit; i++) {
      let choice = Math.floor(Math.random() * deckCopy.length);
      randomOrder.push(deckCopy[choice]);
      deckCopy.splice(choice, 1);
    }
    console.log("randomOrder: ", randomOrder);

    this.setState(() => {
      return {
        deck: randomOrder,
        deckName: deckName,
        boardShape: shape
      };
    });
    // console.log("updateBoard: ", this.state.deck);
  };

  changeShape = props => {
    // console.log("changeShape, props: ", props);
    //filter the object that matches the size
    let newShape = boardShapes.filter(item => item.size === props);

    this.setState(() => {
      return { boardShape: newShape[0] };
    });
    this.updateBoard();
  };

  changeScreen = props => {
    // console.log("changeScreen, props: ", props);
    this.setState({
      currentScreen: props
    });
  };

  changeDeck = props => {
    // console.log("changeDeck, props: ", props);
    let newDeck = this.deckChoices.filter(choice => choice.name === props);
    this.setState(() => {
      return { deckName: newDeck[0].name };
    });
    this.updateBoard();
  };

  render() {
    return (
      <HashRouter>
        <div className="main">
          <Route
            exact
            path="/"
            render={props => (
              <BoardGame
                boardShape={this.state.boardShape}
                handleClick={this.cardClick}
                deck={this.state.deck}
              />
            )}
          />
          <Route
            path="/settings"
            render={props => (
              <SettingsScreen
                choices={boardShapes}
                updateBoard={this.updateBoard}
              />
            )}
          />
          <Route
            path="/decks"
            render={props => (
              <DeckScreen
                updateBoard={this.updateBoard}
                choices={this.deckChoices}
              />
            )}
          />
          <ControlPanel
            changeScreen={this.changeScreen}
            changeHidingSpot={this.changeHidingSpot}
            {...this.state}
          />
        </div>
      </HashRouter>
    );
  }
}

export default App;
