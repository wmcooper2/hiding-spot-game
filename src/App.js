import React from "react";
import BoardGame from "./components/boardgame";
import ControlPanel from "./components/controlpanel";
import { boardShapes, defaultShape } from "./boardshapes";
import { BoardShapeScreen, VocabScreen } from "./components/screens";
import { misc, fruits, animals, colors } from "./decks";
//make api calls to load images from deck files elsewhere
import { HashRouter, Route } from "react-router-dom";
import "./App.sass";
import "bootstrap/dist/css/bootstrap.min.css";

// console.log(process.env.REACT_APP_BUCKET);
// example api call, future functionality
// async function getbutts() {
// const answer = await fetch("https://www.teflassistant.com/api/catbutt");
// return answer;
// }
// getbutts().then(answer => console.log(answer.json()));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardShape: defaultShape,
      deck: misc,
      deckName: "misc",
      currentScreen: "game",
      hidingSpot: 0
    };

    //make api calls to load the images here?
    this.deckChoices = [
      { name: "colors", deck: colors },
      { name: "fruits", deck: fruits },
      { name: "animals", deck: animals },
      { name: "misc", deck: misc }
    ];

    this.cardClick = this.cardClick.bind(this);
    this.changeHidingSpot = this.changeHidingSpot.bind(this);
    this.changeBoardShape = this.changeBoardShape.bind(this);
    this.changeVocab = this.changeVocab.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.flipAllCards = this.flipAllCards.bind(this);
  }

  cardClick = props => {
    let deck = this.state.deck.slice();
    deck[props].flipped = !deck[props].flipped;
    this.setState({
      deck: deck
    });
  };

  flipAllCards = () => {
    let deck = this.state.deck.slice();
    deck.forEach(item => {
      item.flipped = false;
    });
    this.setState({
      deck: deck
    });
  };

  changeHidingSpot = () => {
    let choice = Math.floor(Math.random() * this.state.boardShape.size);
    this.setState({ hidingSpot: choice });
    this.flipAllCards();
    // this.updateBoard(this.state.deckName);
    this.updateBoard();
  };

  updateBoard = props => {
    let deckName = this.state.deckName;
    let deck = this.deckChoices.filter(choice => choice.name === deckName);
    deck = deck[0].deck; // because of filter
    let boardShape = this.state.boardShape;
    let deckCopy = deck.slice(); //copy so you don't ruin the original
    deckCopy.forEach(item => (item.flipped = false)); // reset flipped before display
    let randomOrder = [];
    const randomLimit = deckCopy.length;
    for (let i = 0; i < randomLimit; i++) {
      let choice = Math.floor(Math.random() * deckCopy.length);
      randomOrder.push(deckCopy[choice]);
      deckCopy.splice(choice, 1);
    }

    this.setState(() => {
      return {
        deck: randomOrder,
        deckName: deckName,
        boardShape: boardShape
      };
    });
  };

  changeBoardShape = props => {
    //filter the object that matches the size
    let newShape = boardShapes.filter(item => item.size === props);
    this.setState(() => {
      return { boardShape: newShape[0] };
    });
  };

  changeScreen = props => {
    console.log("changeScreen, props: ", props);
    if (props === "/") {
      //return to game board screen
      this.updateBoard();
    }
    this.setState({
      currentScreen: props
    });
  };

  changeVocab = props => {
    let newDeck = this.deckChoices.filter(choice => choice.name === props);
    this.setState(() => {
      return { deckName: newDeck[0].name };
    });
  };

  render() {
    return (
      <HashRouter>
        <div className="main">
          <Route
            exact
            path="/"
            render={() => (
              <BoardGame handleClick={this.cardClick} {...this.state} />
            )}
          />
          <Route
            path="/settings"
            render={() => (
              <BoardShapeScreen
                choices={boardShapes}
                changeBoardShape={this.changeBoardShape}
              />
            )}
          />
          <Route
            path="/decks"
            render={() => (
              <VocabScreen
                changeVocab={this.changeVocab}
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
