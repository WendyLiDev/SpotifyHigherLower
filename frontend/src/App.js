import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function StartButton({onStart}) {
  return (
    <button id="startGame" onClick={onStart}>
      Start
    </button>
  );
};

function Game({onEnd, firstSong, secondSong}) {
  return (
    <div id="game" display="none" visibility="hidden">
      <div>
        <h3>{firstSong}</h3>
      </div>
      <div>
        <h3>{secondSong}</h3>
        <button id="higherButton">Higher</button>
        <button id="lowerButton">Lower</button>
      </div>
      <button id="handleEnd" onClick={onEnd}>End game</button>
    </div>
  );
};

function App() {
  const [showStartButton, setShowStartButton] = React.useState(true);
  const [showGame, setShowGame] = React.useState(false);
  const [firstSong, setFirstSong] = React.useState('');
  const [secondSong, setSecondSong] = React.useState('');

  const handleStart = async () => {
    setShowGame(true);
    setShowStartButton(false);

    try {
      console.log("handling starting the game");
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/startGame`);
      setFirstSong(data[0].track.name);
      setSecondSong(data[1].track.name);
    } catch (error) {
      console.error('Error getting first two songs:', error);
    }
  };

  const handleEnd = () => {
    setShowGame(false);
    setShowStartButton(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Higher or Lower</h1>
        { showStartButton && <StartButton onStart={handleStart}/> }
        { showGame && 
          <Game 
            onEnd={handleEnd} 
            firstSong={firstSong}
            secondSong={secondSong}
          />
        }
      </header>
    </div>
  );
}

export default App;
