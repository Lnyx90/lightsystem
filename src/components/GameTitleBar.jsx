import React, { useState } from "react";
import IdentityCard from "./IdentityCard";


function GameTitleBar({ formattedDate }) {
  const [showCard, setShowCard] = useState(false);
  
  // Add a state for the character image or get it from props/context
  const [characterImage, setCharacterImage] = useState("/images/characters/default-avatar.jpg"); // Default image path

  return (
    <>
      <div className='fixed mt-4 flex justify-center w-full px-4 pt-4 '>
        <div className='flex flex-wrap items-center justify-center min-w-24 min-h-10 gap-4 sm:gap-8 bg-blue-900 text-white rounded-lg px-2'>
          <span className='text-[5px] md:text-[10px] lg:text-base'>
            Archipelago Adventure
          </span>
          <button
            onClick={() => setShowCard(true)}
            className='text-[5px] md:text-[10px] lg:text-base'
          >
            Level <span>1</span>
          </button>
          <div className='flex items-center'>
            <img
              src='/images/symbol/calendar.png'
              className='w-5 h-5 sm:w-7 sm:h-7 lg:w-10'
              alt='Calendar'
            />
            <span className='text-[5px] md:text-[10px] lg:text-base'>
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
      {showCard && (
        <IdentityCard 
          onClose={() => setShowCard(false)} 
          characterImage={characterImage} 
        />
      )}
    </>
  );
}

export default GameTitleBar;