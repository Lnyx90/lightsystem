import React, { useEffect, useState } from 'react';
import '../css/Game.css';

function Game() {
  const [player, setPlayer] = useState({
    name: '',
    image: '',
  });

  const [currentDate, setCurrentDate] = useState('');
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [money, setMoney] = useState(1000000);

  const [health] = useState(50);
  const [energy] = useState(50);
  const [hygiene] = useState(50);
  const [happiness] = useState(50);

  const [position, setPosition] = useState({ x: 435, y: 260 });
  const step = 15;

 
  const [imageLoaded, setImageLoaded] = useState(false);

  const closePopUp = () => {
    setShowWelcomePopup(false);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('playerName');
    const storedImage = localStorage.getItem('PlayerImage');


    console.log('Loaded playerName:', storedName);
    console.log('Loaded playerImage:', storedImage);

    setPlayer({
      name: storedName || 'Player',
      image: storedImage || '/images/symbol/wayang1.png', 
    });

    const date = new Date();
    const format = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('en-US', format);
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        let { x, y } = prev;

        if (e.key === 'ArrowUp') y -= step;
        else if (e.key === 'ArrowDown') y += step;
        else if (e.key === 'ArrowLeft') x -= step;
        else if (e.key === 'ArrowRight') x += step;

        return { x, y };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className=" fixed flex flex-col items-center justify-center min-h-screen bg-cover bg-center scale-factor ">
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 px-4" id="welcomePopUp">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-xs relative">
            <h2 className="text-lg font-bold mb-2">
              Welcome, <span className="break-words">{player.name}</span>!
            </h2>
            <p className="text-sm mb-2">You have chosen:</p>
            <img
              src={player.image}
              alt="Character"
              className="w-24 h-auto max-h-40 mx-auto mb-4 object-contain"
            />
            <p className="text-sm mb-4">Time for an Epic Journey!</p>
            <button
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
              onClick={closePopUp}
            >
              Play
            </button>
            <audio id="click-sound" src="/assets/bg-music/click.mp4" preload="auto" />
          </div>
        </div>
      )}

      <div className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center">
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl bg-blue-900 text-white p-2 rounded-lg flex justify-between items-center shadow-lg">
          <span className="text-base font-bold">Archipelago Adventure</span>
          <button className="z-50 text-base fle">
            Level <span>1</span>
          </button>
          <div className="flex flex-col min-w-max">
            <div className="flex items-center">
              <img src="/images/symbol/calendar.png" className="w-10 h-10" alt="Calendar" />
              <span className="text-base ml-2">{currentDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center">
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl p-2 rounded-lg flex justify-between items-center ">
          <img src="/images/symbol/hunger.png" alt="Health" className="w-5 h-5" />
          <div className="relative w-48 h-10 flex items-center">
            <img src="/images/symbol/taskbar.png" className="absolute top-0 left-0 w-full h-full" alt="Taskbar" />
            <div className="absolute flex items-center gap-2 px-3 w-full">
              <div className="w-40 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div id="health-bar" className="h-full bg-red-500 transition-all" style={{ width: `${health}%` }}></div>
              </div>
            </div>
          </div>
          <span id="health-text" className="text-sm">{health}%</span>

          <img src="/images/symbol/energi.png" className="w-5 h-5" alt="Energy" />
          <div className="relative w-48 h-10 flex items-center">
            <img src="/images/symbol/taskbar.png" className="absolute top-0 left-0 w-full h-full" alt="Taskbar" />
            <div className="absolute flex items-center gap-2 px-3 w-full">
              <div className="w-40 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div id="energy-bar" className="h-full bg-yellow-300 transition-all" style={{ width: `${energy}%` }}></div>
              </div>
            </div>
          </div>
          <span id="energy-text" className="text-sm">{energy}%</span>

          <img src="/images/symbol/hygine.png" className="w-9 h-9" alt="Hygiene" />
          <div className="relative w-48 h-10 flex items-center">
            <img src="/images/symbol/taskbar.png" className="absolute top-0 left-0 w-full h-full" alt="Taskbar" />
            <div className="absolute flex items-center gap-2 px-3 w-full">
              <div className="w-40 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div id="hygiene-bar" className="h-full bg-blue-400 transition-all" style={{ width: `${hygiene}%` }}></div>
              </div>
            </div>
          </div>
          <span id="hygiene-text" className="text-sm">{hygiene}%</span>

          <img src="/images/symbol/happy.webp" className="w-5 h-5" alt="Happiness" />
          <div className="relative w-48 h-10 flex items-center">
            <img src="/images/symbol/taskbar.png" className="absolute top-0 left-0 w-full h-full" alt="Taskbar" />
            <div className="absolute flex items-center gap-2 px-3 w-full">
              <div className="w-40 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div id="happiness-bar" className="h-full bg-pink-400 transition-all" style={{ width: `${happiness}%` }}></div>
              </div>
            </div>
          </div>
          <span id="happiness-text" className="text-sm">{happiness}%</span>
        </div>

        <div className="relative max-w-[850px] h-[680px] top-28 left-1/3">
          <div className="absolute top-2 right-2 z-20 flex items-center space-x-1">
            <img src="/images/symbol/money.png" className="w-6" alt="Money" />
            <span id="money" className="text-white font-bold text-sm">{money}</span>
          </div>

          <img src="/images/symbol/home.png" className="absolute w-12" style={{ left: '60px', top: '70px', zIndex: 5 }} alt="Home" />
          <img src="/images/symbol/bromo.png" className="absolute w-15 h-15" style={{ left: '600px', top: '420px', zIndex: 5 }} alt="Bromo" />
          <img src="/images/symbol/kuta.png" className="absolute w-20 h-25" style={{ left: '270px', top: '250px', zIndex: 5 }} alt="Kuta" />
          <img src="/images/symbol/borobudur.png" alt="Borobudur" className="absolute w-16 h-16" style={{ left: '580px', top: '195px', zIndex: 5 }} />
          <img src="/images/symbol/lake_toba.png" className="absolute w-16" style={{ left: '330px', top: '50px', zIndex: 5 }} alt="Lake Toba" />

          <img src="/images/background/map.jpg" className="w-full h-[500px] rounded-lg shadow-lg" alt="Map" />

          <div
            id="player"
            className="absolute text-white font-bold transition-all text-center"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 10,
              transition: 'left 0.2s, top 0.2s',
            }}
          >
            <p
              id="player-name"
              className="text-blue-900 px-1 py-1 fade-in rounded-lg"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'absolute',
                bottom: '100%',
                fontFamily: "'Press Start 2P'",
                fontSize: '10px',
              }}
            >
              {player.name}
            </p>
            <img
              id="player-img"
              src={player.image}
              alt="Player"
              width="40"
              className={`rounded-full transition-all duration-700 ease-out transform ${
                imageLoaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
