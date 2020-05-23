import React from "react";
import { Link } from "react-router-dom";

const DecksBtn = (props) => {
  const { changeScreen, currentScreen } = props;
  if (currentScreen === "decks") {
    return (
      <Link to="/">
        <button className="controlbtn" onClick={() => changeScreen("/")}>
          Game
        </button>
      </Link>
    );
  } else {
    return (
      <Link to="/decks">
        <button className="controlbtn" onClick={() => changeScreen("decks")}>
          Vocab
        </button>
      </Link>
    );
  }
};

const SettingsBtn = (props) => {
  const { changeScreen, currentScreen } = props;
  if (currentScreen === "settings") {
    return (
      <Link to="/">
        <button className="controlbtn" onClick={() => changeScreen("/")}>
          Game
        </button>
      </Link>
    );
  } else {
    return (
      <Link to="/settings">
        <button className="controlbtn" onClick={() => changeScreen("settings")}>
          Cards
        </button>
      </Link>
    );
  }
};

const ControlPanel = (props) => {
  return (
    <div className="controlpanel">
      <div className="controls">
        <DecksBtn {...props} />
        <SettingsBtn {...props} />
        <button className="controlbtn" onClick={() => props.changeHidingSpot()}>
          Change
        </button>
      </div>
      <div className="instructions">
        Choose a vocab set and card amount. Click "Change" to reset the game.
      </div>
    </div>
  );
};

export default ControlPanel;
