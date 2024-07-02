import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

type Track = {
  name: string;
  id: number;
  image: string;
  artists: string[];
};

function StartButton({onStart}:any) {
  return (
    <button id="startGame" onClick={onStart}>
      Start
    </button>
  );
};

interface GameProps {
  onEnd: () => void,
  firstSong: Track,
  secondSong: Track
};

const Game:React.FC<GameProps> = ({onEnd, firstSong, secondSong}) => {
  return (
    <div id="game">
      <div className='container'>
        <div 
          className="left" 
          style={{
            backgroundImage: `url('${firstSong.image}')`,
          }}
        >
          <div className="songInfo">
            <h3>{firstSong.name}</h3>
            <h6>{firstSong.artists}</h6>
          </div>
        </div>
        
        <div 
          className="right"
          style={{
            backgroundImage: `url('${secondSong.image}')`,
          }}
        >
          <div className="songInfo">
            <h3>{secondSong.name}</h3>
            <h6>{secondSong.artists}</h6>
          </div>

          <div>
            <button id="higherButton">Higher</button>
            <button id="lowerButton">Lower</button>
          </div>
        </div>
      </div>

      <button id="handleEnd" onClick={onEnd}>End game</button>
    </div>
  );
};

function App() {
  const sampleTrack: Track = {
    id: 1,
    name: 'Song Title',
    image: '',
    artists: []
  };

  const [showStartButton, setShowStartButton] = React.useState(true);
  const [showGame, setShowGame] = React.useState(false);
  const [firstSong, setFirstSong] = useState<Track>(sampleTrack);
  const [secondSong, setSecondSong] = useState<Track>(sampleTrack);


  const handleStart: () => void = async () => {
    setShowGame(true);
    setShowStartButton(false);

    try {
      console.log("handling starting the game");
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/startGame`);
      const artists1: string[] = [];
      const artists2: string[] = [];
      data[0].track.album.artists.map((item: any) => {
        artists1.push(item.name);
      });
      data[1].track.album.artists.map((item: any) => {
        artists2.push(item.name);
      });
      const song1: Track = {
        name: data[0].track.name,
        id: data[0].track.id,
        image: data[0].track.album.images[0].url,
        artists: artists1
      };
      const song2: Track = {
        name: data[1].track.name,
        id: data[1].track.id,
        image: data[1].track.album.images[0].url,
        artists: artists2
      }
      setFirstSong(song1);
      setSecondSong(song2);
    } catch (error) {
      console.error('Error getting first two songs:', error);
    }
  };

  const handleEnd: () => void = () => {
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
