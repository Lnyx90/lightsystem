import React, { useEffect, useState } from 'react';
import '../css/Game.css';

function Game() {
  const [player, setPlayer] = useState({ name: '', image: '' });
  const [currentDate, setCurrentDate] = useState('');
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [money, setMoney] = useState(1000000);
  const [health] = useState(50);
  const [energy] = useState(50);
  const [hygiene] = useState(50);
  const [happiness] = useState(50);
  const [position, setPosition] = useState({ x: 1000, y: 750 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // State to store current map background image URL
  const [mapBg, setMapBg] = useState("/images/background/map.png");

  const [locationActions, setLocationActions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const step = 15;
  const mapWidth = 2000;
  const mapHeight = 1500;
  const viewWidth = 850;
  const viewHeight = 450;

  const closePopUp = () => setShowWelcomePopup(false);

  useEffect(() => {
    const storedName = localStorage.getItem('playerName');
    const storedImage = localStorage.getItem('PlayerImage');

    setPlayer({
      name: storedName || 'Player',
      image: storedImage || '/images/symbol/wayang1.png',
    });

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      move(
        e.key === 'ArrowUp' ? 'up' :
          e.key === 'ArrowDown' ? 'down' :
            e.key === 'ArrowLeft' ? 'left' :
              e.key === 'ArrowRight' ? 'right' :
                null
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // UseEffect to update map background and available actions based on position
  useEffect(() => {
    let bgImage = "/images/background/map.png"; // default map background
    let currentLoc = null;
    let actions = [];

    // Kuta Beach area
    if (position.x > 480 && position.x < 520 && position.y > 280 && position.y < 320) {
      bgImage = "/images/background/kuta.jpg";
      currentLoc = "Kuta Beach";

      // Actions at specific points inside Kuta
      if (position.x > 485 && position.x < 495 && position.y > 285 && position.y < 295) {
        actions = ["Pick-up Trash"];
      } else if (position.x > 505 && position.x < 515 && position.y > 305 && position.y < 315) {
        actions = ["Buy Snack"];
      }
    }
    // Borobudur Temple area
    else if (position.x > 670 && position.x < 710 && position.y > 200 && position.y < 240) {
      bgImage = "/images/background/borobudur.jpg";
      currentLoc = "Borobudur Temple";

      if (position.x > 695 && position.x < 705 && position.y > 215 && position.y < 225) {
        actions = ["Take a Picture"];
      }
    }
    // Bromo Mountain area
    else if (position.x > 750 && position.x < 790 && position.y > 450 && position.y < 490) {
      bgImage = "/images/background/bromo.jpg";
      currentLoc = "Bromo Mountain";

      if (position.x > 755 && position.x < 765 && position.y > 455 && position.y < 465) {
        actions = ["Make a Cinematic Video"];
      }
    }
    // Toba Lake area
    else if (position.x > 380 && position.x < 420 && position.y > 30 && position.y < 70) {
      bgImage = "/images/background/toba.jpg";
      currentLoc = "Toba Lake";

      if (position.x > 385 && position.x < 395 && position.y > 35 && position.y < 45) {
        actions = ["Take a Shower"];
      }
    }

    setMapBg(bgImage);
    setCurrentLocation(currentLoc);
    setLocationActions(actions);
  }, [position]);

  const move = (direction) => {
    setPosition((prev) => {
      let { x, y } = prev;
      if (direction === 'up') y = Math.max(0, y - step);
      if (direction === 'down') y = Math.min(mapHeight, y + step);
      if (direction === 'left') x = Math.max(0, x - step);
      if (direction === 'right') x = Math.min(mapWidth, x + step);
      return { x, y };
    });
  };

  return (
    <div className="fixed flex flex-col items-center justify-center min-h-screen bg-cover bg-center scale-factor">
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-xs relative">
            <h2 className="text-lg font-bold mb-2">
              Welcome, <span className="break-words">{player.name}</span>!
            </h2>
            <p className="text-sm mb-2">You have chosen:</p>
            <img src={player.image} alt="Character" className="w-24 h-auto max-h-40 mx-auto mb-4 object-contain" />
            <p className="text-sm mb-4">Time for an Epic Journey!</p>
            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700" onClick={closePopUp}>Play</button>
          </div>
        </div>
      )}

      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl bg-blue-900 text-white p-2 rounded-lg flex justify-between items-center shadow-lg">
        <span className="text-base font-bold">Archipelago Adventure</span>
        <button className="z-50 text-base">Level <span>1</span></button>
        <div className="flex items-center">
          <img src="/images/symbol/calendar.png" className="w-10 h-10" alt="Calendar" />
          <span className="text-base ml-2">{currentDate}</span>
        </div>
      </div>

      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl p-2 rounded-lg flex justify-between items-center">
        {[{ icon: 'hunger', value: health, color: 'bg-red-500' },
          { icon: 'energi', value: energy, color: 'bg-yellow-300' },
          { icon: 'hygine', value: hygiene, color: 'bg-blue-400' },
          { icon: 'happy', value: happiness, color: 'bg-pink-400' }].map(({ icon, value, color }, index) => (
            <React.Fragment key={index}>
              <img src={`/images/symbol/${icon}.png`} alt={icon} className="ml-5 w-6 h-6" />
              <div className="relative w-48 h-10 flex items-center">
                <img src="/images/symbol/taskbar.png" className="absolute w-full h-full" alt="Taskbar" />
                <div className="absolute flex items-center gap-2 px-3 w-full">
                  <div className="w-40 h-3 bg-gray-300 rounded-full overflow-hidden">
                    <div className={`h-full ${color} transition-all`} style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              </div>
              <span className="text-sm">{value}%</span>
            </React.Fragment>
          ))}
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-6 mt-34">
        <div className="relative w-[850px] h-[680vw] rounded-lg overflow-hidden shadow-lg ml-30">
          {/* Map container with dynamic background image */}
          <div
            className="absolute transition-transform duration-300"
            style={{
              width: `${mapWidth}px`,
              height: `${mapHeight}px`,
              backgroundImage: `url('${mapBg}')`,
              backgroundSize: 'cover',
              transform: `translate(${-position.x + viewWidth / 2}px, ${-position.y + viewHeight / 2}px)`,
            }}
          >
            {/* Player icon */}
            <div
              id="player"
              className="absolute transition-all duration-300"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 10,
              }}
            >
              <p
                className="text-gray-800 px-1 py-0.5 rounded text-[8px] font-semibold"
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  transform: 'translateX(-50%)',
                  left: '50%',
                }}
              >
                {player.name}
              </p>
              <img
                src={player.image}
                alt="Player"
                width="50"
                className={`rounded-full transition-all duration-700 ease-out transform ${
                  imageLoaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>

        {/* Show action buttons when available */}
        {currentLocation && locationActions.length > 0 && (
          <div className="flex flex-col gap-4 p-4 rounded-lg bg-white bg-opacity-90 shadow-lg">
            <h3 className="font-bold text-xl mb-2">{currentLocation} Actions</h3>
            {locationActions.map((action, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
                onClick={() => alert(`You chose to: ${action}`)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

<div id="location" className="bg-white p-4 rounded-lg shadow-lg w-80 h-135">
          <div className="text-center text-m font-semibold mb-4">
            {currentLocation ? `You're at ${currentLocation}` : "You're Lost!"}
          </div>

          <div className="flex items-center justify-center mb-4">
            <img src="/images/symbol/time.png" alt="day" className="w-8 h-8" />
          </div>

          {locationActions.length > 0 ? (
            locationActions.map((action, i) => (
              <button
                key={i}
                className="w-full bg-blue-500 text-xs text-white p-2 mt-2 rounded-lg hover:bg-blue-600"
                onClick={() => console.log(`Action: ${action}`)}
              >
                {action}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">No actions available here.</p>
          )}

          <div className="flex flex-col items-center justify-center mt-4">
            <button onClick={() => move('up')}>
              <img src="/images/symbol/top.png" alt="up" className="bg-blue-200 w-12 h-12 rounded-full hover:bg-pink-200" />
            </button>
            <div className="flex space-x-4 mt-2">
              <button onClick={() => move('left')}>
                <img src="/images/symbol/left.png" alt="left" className="bg-blue-200 w-12 h-12 rounded-full hover:bg-pink-200" />
              </button>
              <button onClick={() => move('right')}>
                <img src="/images/symbol/right.png" alt="right" className="bg-blue-200 w-12 h-12 rounded-full hover:bg-pink-200 ml-5" />
              </button>
            </div>
            <button onClick={() => move('down')} className="mt-2">
              <img src="/images/symbol/down.png" alt="down" className="bg-blue-200 w-12 h-12 rounded-full hover:bg-pink-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
