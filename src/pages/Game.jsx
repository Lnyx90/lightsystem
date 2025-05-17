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
  const [position, setPosition] = useState({ x: 435, y: 260 });
  const step = 15;
  const [imageLoaded, setImageLoaded] = useState(false);
  const actions = ['', '', '', ''];

  const closePopUp = () => setShowWelcomePopup(false);

  useEffect(() => {
    const storedName = localStorage.getItem('playerName');
    const storedImage = localStorage.getItem('PlayerImage');
    document.body.style.backgroundImage = "url('/images/background/newbg.gif')";

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

  const move = (direction) => {
    setPosition((prev) => {
      let { x, y } = prev;
      if (direction === 'up') y -= step;
      else if (direction === 'down') y += step;
      else if (direction === 'left') x -= step;
      else if (direction === 'right') x += step;
    
      return { x, y };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center scale-factor">
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
            <audio id="click-sound" src="/assets/bg-music/click.mp4" preload="auto" />
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

      <div className="flex flex-row flex-wrap justify-center gap-6 mt-34 ">
        <div className="relative w-[850px] h-[680px] left-50 mr-50">
          <div className="absolute top-2 right-2 z-20 flex items-center space-x-1">
            <img src="/images/symbol/money.png" className="w-6" alt="Money" />
            <span className="text-white font-bold text-sm">{money}</span>
          </div>


          <img src="/images/background/map.png" className="w-full h-[550px] rounded-lg shadow-lg" alt="Map" />

          <div
            id="player"
            className="absolute text-white font-bold transition-all text-center"
            style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex: 10 }}
          >
            <p
              className="text-blue-900 px-1 py-1 fade-in rounded-lg"
              style={{ left: '50%', transform: 'translateX(-50%)', position: 'absolute', bottom: '100%', fontFamily: 'Press Start 2P', fontSize: '10px' }}
            >
              {player.name}
            </p>
            <img
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

        <div id="location" className="bg-white p-4 rounded-lg shadow-lg w-80 h-135">
          <div className="text-center text-m font-semibold mb-4">Welcome to Archipelago</div>
          <div className="flex items-center justify-center mb-4">
            <img src="/images/symbol/time.png" alt="day" className="w-8 h-8" />
          </div>

          {actions.map((action, i) => (
            <button
              key={i}
              className={`w-full bg-blue-500 text-xs text-white p-2 mt-4 rounded-lg mb-2 hover:${i === 3 ? 'bg-yellow-600' : 'bg-blue-600'}`}
              onClick={() => console.log(`Action ${i + 1} clicked`)}
            >
              {action || `Action ${i + 1}`}
            </button>
          ))}

          <div className="flex flex-col items-center justify-center  mt-4">
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