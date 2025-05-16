import React, { useState, useEffect, useRef } from 'react';
import "../css/PickChar.css";

function PickChar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isFading, setIsFading] = useState(false);
  
  const characters = [
    "/images/wayang1.png",
    "/images/wayang2.png",
    "/images/wayang3.png",
  ];
  
  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    // Initialize music
    const savedTime = localStorage.getItem("musicTime") || 0;
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = savedTime;
      bgMusicRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }

    // Save music time when leaving page
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

  const selectCharacter = () => {
    playClickSound();
    if (!playerName.trim()) {
      setNotificationMessage("Please enter your name!");
      setShowNotification(true);
      return;
    }
    
    localStorage.setItem("selectedCharacterImage", characters[currentIndex]);
    localStorage.setItem("playerName", playerName);
    window.location.href = "game.jsx";
  };

  return (
    <div 
  className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
  style={{ backgroundImage: "url('/images/homepage.jpg')" }}
>
  <div className="flex flex-col items-center text-center px-4 w-full max-w-4xl">
    
    {/* Title at the top, centered */}
    <h1 className="text-4xl font-pixel text-white mt-[-8px]">Choose Your Character</h1>


    

    {/* Character selection with left/right buttons */}
    <div className="flex items-center space-x-4 sm:space-x-6 mb-6">
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
        className={`w-23 sm:w-32 md:w-40 h-auto floating character-float ${isFading ? 'fade-out' : 'fade-in'}`}
      />

      <button
        onClick={nextCharacter}
        className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white text-sm sm:text-lg rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
      >
        ❯
      </button>
    </div>

    {/* Name input */}
    <input
      type="text"
      id="playerName"
      value={playerName}
      onChange={handleNameChange}
      style={{ backgroundColor: 'white' }}
      placeholder="Enter Your Name"
      className="px-3 sm:px-4 py-2 text-sm sm:text-lg border-2 border-blue-800 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 sm:w-64 md:w-72 placeholder:text-xs sm:placeholder:text-sm mb-4"
    />

    {/* Select button */}
    <button
      onClick={selectCharacter}
      className="px-5 sm:px-8 py-2 sm:py-4 bg-blue-800 text-white text-sm sm:text-xl rounded-full shadow-lg hover:bg-blue-500 transition transform hover:scale-110"
    >
      Select Character
    </button>

    {/* Notification if any */}
    {showNotification && (
      <div className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 flex items-center">
        <img src="public/images/alert.png" className="w-8 h-8 mr-2" alt="alert" />
        {notificationMessage}
      </div>
    )}
  </div>
</div>

  );
}

export default PickChar;