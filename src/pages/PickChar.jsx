import React, { useState, useEffect, useRef } from 'react';
import "../css/PickChar.css";
import { useNavigate } from 'react-router-dom';

function PickChar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const characters = [
    "/images/wayang/wayang1.png",
    "/images/wayang/wayang2.png",
    "/images/wayang/wayang3.png",
  ];

  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    const savedTime = localStorage.getItem("musicTime") || 0;
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = savedTime;
      bgMusicRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }

    return () => {
      if (bgMusicRef.current) {
        localStorage.setItem("musicTime", bgMusicRef.current.currentTime);
      }
    };
  }, []);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const updateCharacter = (newIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 300);
  };

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.log("Sound play prevented", e));
    }
  };

  const prevCharacter = () => {
    playClickSound();
    const newIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateCharacter(newIndex);
  };

  const nextCharacter = () => {
    playClickSound();
    const newIndex = (currentIndex + 1) % characters.length;
    updateCharacter(newIndex);
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSelectAndNavigate = () => {
    if (!playerName.trim()) {
      setNotificationMessage("Please enter your name!");
      setShowNotification(true);
      return;
    }
    playClickSound();
    setShowLevelSelection(true);
  };

  const handleLevelSelect = (level) => {
    playClickSound();
    localStorage.setItem("PlayerImage", characters[currentIndex]);
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("gameLevel", level);
    navigate("/game");
  };

  return (
    <div className="w-screen h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/background/backgroundhomepage.gif')" }}>
      
      {/* Music and click sound refs */}
      <audio ref={bgMusicRef} src="/audio/bgm.mp3" loop />
      <audio ref={clickSoundRef} src="/audio/click.mp3" />

      <div className="flex flex-col items-center text-center px-4 w-full max-w-4xl z-10">
        <h1 className="text-xl sm:text-3xl md:text-5xl text-glow-pickchar text-white text-center leading-tight text-pulse-pickchar" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          Choose Your <br /> Character
        </h1>

        <div className="flex items-center space-x-4 sm:space-x-6 mb-6 mt-4">
          <button
            onClick={prevCharacter}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white text-sm sm:text-lg rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
          >
            ❮
          </button>
          <img
            id="character"
            src={characters[currentIndex]}
            alt="Character"
            className={`w-24 sm:w-32 md:w-40 h-auto floating character-float ${isFading ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'}`}
          />
          <button
            onClick={nextCharacter}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white text-sm sm:text-lg rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
          >
            ❯
          </button>
        </div>

        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={handleNameChange}
          style={{ backgroundColor: 'white' }}
          placeholder="Enter Your Name"
          className="px-3 sm:px-4 py-2 text-sm sm:text-lg border-2 border-blue-800 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 sm:w-64 md:w-72 placeholder:text-xs sm:placeholder:text-sm mb-4"
        />

        <button
          onClick={handleSelectAndNavigate}
          className="px-5 sm:px-8 py-2 sm:py-4 bg-blue-800 text-white text-sm sm:text-xl rounded-full shadow-lg hover:bg-blue-500 transition transform hover:scale-110"
        >
          Select Character
        </button>

        {showNotification && (
          <div className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 flex items-center">
            <img src="/images/symbol/alert.png" className="w-8 h-8 mr-2" alt="alert" />
            {notificationMessage}
          </div>
        )}
      </div>

      {/* Level selection overlay with video background */}
      {showLevelSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {/* Video background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/background/level.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay blur */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

          {/* Level selection content */}
          <div className="w-screen h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/background/backgroundhomepage.gif')" }}>
          <div className="relative z-10 bg-white bg-opacity-90 p-6 sm:p-8 rounded-2xl shadow-2xl border-4 border-blue-700 max-w-md w-full text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-6">Choose Difficulty Level</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleLevelSelect("easy")}
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition transform hover:scale-105 font-semibold"
              >
                Easy
              </button>
              <button
                onClick={() => handleLevelSelect("medium")}
                className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition transform hover:scale-105 font-semibold"
              >
                Medium
              </button>
              <button
                onClick={() => handleLevelSelect("hard")}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition transform hover:scale-105 font-semibold"
              >
                Hard
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PickChar;
