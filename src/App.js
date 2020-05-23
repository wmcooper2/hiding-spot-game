import React from "react";
import BoardGame from "./components/boardgame";
import ControlPanel from "./components/controlpanel";
import { boardShapes, defaultShape } from "./boardshapes";
import { BoardShapeScreen, VocabScreen } from "./components/screens";
import { misc, fruits, animals, colors } from "./decks";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardShape: defaultShape,
      deck: misc,
      deckName: "misc",
      currentScreen: "game",
      hidingSpot: 0,
      boardWidth: null,
      boardHeight: null,
      cardSize: null,
    };

    this.deckChoices = [
      { name: "color", deck: colors },
      { name: "fruit", deck: fruits },
      { name: "animal", deck: animals },
      { name: "misc", deck: misc },
    ];

    this.cardClick = this.cardClick.bind(this);
    this.changeHidingSpot = this.changeHidingSpot.bind(this);
    this.changeBoardShape = this.changeBoardShape.bind(this);
    this.changeVocab = this.changeVocab.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.flipAllCards = this.flipAllCards.bind(this);
    // this.updateCardSize();
  }

  cardClick = (props) => {
    let deck = this.state.deck.slice();
    deck[props].flipped = !deck[props].flipped;
    this.setState({
      deck: deck,
    });
  };

  flipAllCards = () => {
    let deck = this.state.deck.slice();
    deck.forEach((item) => {
      item.flipped = false;
    });
    this.setState({
      deck: deck,
    });
  };

  changeHidingSpot = () => {
    let choice = Math.floor(Math.random() * this.state.boardShape.size);
    this.setState({ hidingSpot: choice });
    this.flipAllCards();
    this.updateBoard();
  };

  updateBoard = (props) => {
    let deckName = this.state.deckName;
    let deck = this.deckChoices.filter((choice) => choice.name === deckName);
    deck = deck[0].deck; // because of filter
    let boardShape = this.state.boardShape;
    let deckCopy = deck.slice(); //copy so you don't ruin the original
    deckCopy.forEach((item) => (item.flipped = false)); // reset flipped before display
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
        boardShape: boardShape,
      };
    });
  };

  changeBoardShape = (props) => {
    //filter the object that matches the size
    let newShape = boardShapes.filter((item) => item.size === props);
    this.setState(() => {
      return { boardShape: newShape[0] };
    });
  };

  changeScreen = (props) => {
    if (props === "/") {
      //return to game board screen
      this.updateBoard();
    }
    this.setState({
      currentScreen: props,
    });
  };

  changeVocab = (props) => {
    let newDeck = this.deckChoices.filter((choice) => choice.name === props);
    this.setState(() => {
      return { deckName: newDeck[0].name };
    });
  };

  updateCardSize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cardSize =
      width > height
        ? Math.floor((height / this.state.boardShape.y) * 0.9)
        : Math.floor((width / this.state.boardShape.x) * 0.9);

    this.setState(() => {
      return {
        boardWidth: width, //because of control panel width and border
        boardHeight: height,
        cardSize: cardSize,
      };
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateCardSize);
    this.updateCardSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateCardSize);
  }

  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

export default App;
