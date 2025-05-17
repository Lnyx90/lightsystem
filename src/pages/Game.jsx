import React, { useEffect, useState } from 'react';
import '../css/Game.css';

function Game() {
  const [player, setPlayer] = useState({ name: '', image: '' });
  const [currentDate, setCurrentDate] = useState('');
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [money] = useState(100000);
  const [health] = useState(50);
  const [energy] = useState(50);
  const [hygiene] = useState(50);
  const [happiness] = useState(50);
  const [position, setPosition] = useState({ x: 1000, y: 750 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const [actions, setActions] = useState([]);
  const [currentMap, setCurrentMap] = useState('default');
  const [locationText, setLocationText] = useState("You're Lost!");

  const step = 15;

  useEffect(() => {
    document.body.style.backgroundImage = "url('/images/background/newbg.gif')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
  }, []);

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

  const move = (direction) => {
    setPosition((prev) => {
      let { x, y } = prev;

      let maxWidth = 2000;   
      let maxHeight = 1500; 

      if (direction === 'up') y = Math.max(0, y - step);
      if (direction === 'down') y = Math.min(maxHeight, y + step);
      if (direction === 'left') x = Math.max(0, x - step);
      if (direction === 'right') x = Math.min(maxWidth, x + step);

      return { x, y };
    });
  };


  useEffect(() => {
    if (currentMap === 'default') {
    
      if (position.x > 1630 && position.x < 1885 && position.y > 1095 && position.y < 1125) {
        setCurrentMap('lake');
        setPosition({ x: 100, y: 100 }); 
        setActions([]);
        setLocationText('Welcome to Lake Toba');
      }else if (position.x > 510 && position.x < 610 && position.y > 900 && position.y < 1170) {
        setCurrentMap('beach');
        setPosition({ x: 100, y: 100 }); 
        setActions([]);
        setLocationText('Welcome to Kuta Beach');
      }
    }
  }, [position, currentMap]);

  // Update actions based on current map and player position
  useEffect(() => {
    if (currentMap === 'default') {
      setLocationText("You're Lost!");
      setActions([]);
    } else if (currentMap === 'lake') {
      // Actions for lake map specific spots
      if (position.x > 50 && position.x < 110 && position.y > 90 && position.y < 130) {
        setActions(["Sand Play", "Buy Drink", "Buy Snack", "Pick-up Trash"]);
      } else {
        setActions([]);
      }
    }else if (currentMap === 'beach') {
      // Actions for lake map specific spots
      if (position.x > 50 && position.x < 110 && position.y > 90 && position.y < 130) {
        setActions(["Sand Play", "Buy Drink", "Buy Snack", "Pick-up Trash"]);
      } else {
        setActions([]);
      }
    }
  }, [currentMap, position]);

  
  const mapImages = {
    default: "/images/background/map.png",
    lake: "/images/background/lake.jpg",
    beach:"/images/background/beach.gif"
   
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
            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => setShowWelcomePopup(false)}>Play</button>
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
        <div className="relative w-[850px] h-[680px] rounded-lg overflow-hidden shadow-lg ml-30">
          <div className="fixed left-0.8 transform py-0.5 px-2 flex items-center shadow-lg z-10">
            <img
              src="/images/symbol/money.png"
              className="w-6 h-6"
              alt="Money"
            />
            <span className="text-white mr-2">{money.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
          </div>
          <div
  className="absolute transition-transform duration-300"
  style={{
    width: '2000px',
    height: '1500px',
    backgroundImage:
    currentMap === 'default'
      ? "url('/images/background/map.png')"
      : currentMap === 'lake'
        ? "url('/images/background/lake.jpg')"
        : currentMap === 'beach'
          ? "url('/images/background/beach.gif')"
          : 'none',  
    backgroundSize: 'cover',
    transform: `translate(${-position.x + 425}px, ${-position.y + 225}px)`,
  }}
>
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

        <div id="location" className="bg-white p-4 rounded-lg shadow-lg w-80 h-135">
          <div className="text-center text-m font-semibold mb-4">
          <div className="fixed bottom-4 left-4 bg-white p-2 rounded shadow">
        X: {position.x}, Y: {position.y}
        </div>

            {currentMap === 'default' ? "You're Lost!" : locationText}
          </div>

          <div className="flex items-center justify-center mb-4">
            <img src="/images/symbol/time.png" alt="day" className="w-8 h-8" />
          </div>

          {actions.length > 0 ? (
            actions.map((action, i) => (
              <button
                key={i}
                className="w-full bg-blue-500 text-xs text-white p-2 mt-2 rounded-lg hover:bg-blue-600"
                onClick={() => console.log(`Action: ${action}`)}
              >
                {action}
              </button>
            ))) : (
              <div className="text-center text-xs text-gray-600 mt-2">
                No actions available here.
              </div>
          )}

          
          {currentMap !== 'default' && (
            <button
              onClick={() => {
                setCurrentMap('default');
                setPosition({ x: 1000, y: 750 });
                setActions([]);
                setLocationText("You're Lost!");
              }}
              className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white rounded-lg py-2"
            >
              Back to Main Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
