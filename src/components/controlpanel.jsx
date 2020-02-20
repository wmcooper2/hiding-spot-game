import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const DecksBtn = props => {
  const { changeScreen, currentScreen } = props;
  //   console.log("DecksBtn, props: ", props);
  if (currentScreen === "decks") {
    return (
      <Link to="/">
        <Button onClick={() => changeScreen("/")} variant="primary" block>
          Game
        </Button>
      </Link>
    );
  } else {
    return (
      <Link to="/decks">
        <Button onClick={() => changeScreen("decks")} variant="primary" block>
          Vocab
        </Button>
      </Link>
    );
  }
};

const SettingsBtn = props => {
  //   console.log("SettingsBtn, props: ", props);
  const { changeScreen, currentScreen } = props;
  if (currentScreen === "settings") {
    return (
      <Link to="/">
        <Button onClick={() => changeScreen("/")} variant="primary" block>
          Game
        </Button>
      </Link>
    );
  } else {
    return (
      <Link to="/settings">
        <Button
          onClick={() => changeScreen("settings")}
          variant="primary"
          block
        >
          Cards
        </Button>
      </Link>
    );
  }
};

const ControlPanel = props => {
  // console.log("ControlPanel, props: ", props);
  return (
    <div className="controlpanel">
      {/* <div className="deckinplay">{deckName}</div> */}
      <div className="controls">
        <DecksBtn {...props} />
        <SettingsBtn {...props} />
        <Button
          onClick={() => props.changeHidingSpot()}
          variant="primary"
          block
        >
          Change
        </Button>
      </div>
      <div className="instructions">Choose a vocab set and the amount of cards. Click change to move the hidden item and shuffle the cards.</div>
    </div>
  );
};

export default ControlPanel;
