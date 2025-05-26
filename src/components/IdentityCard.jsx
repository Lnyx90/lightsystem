import React, { useState } from "react";

function IdentityCard({ onClose, characterImage, userName }) {
  const [flipped, setFlipped] = useState(false);
  const selectedCharacterImage = localStorage.getItem('PlayerImage');


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-50">
      <div
        className="relative w-128 h-90"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
           <div
            className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            {!flipped && (
              <button
                className="absolute top-2 right-2 text-lg font-bold z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                ×
              </button>
            )}
            
            {/* Character Image on Left */}
            <div className="w-full h-full flex flex-col">
  <h2 className="text-2xl text-center font-bold mb-0 mt-8">ID Card</h2>
  <div className="flex flex-1">
    <div className="w-1/3 h-full flex items-center justify-center p-8 mt-[-1rem] ml-4">
      <img
        src={selectedCharacterImage}
        alt="Character Profile"
        className="h-full w-auto object-contain"
      />
    </div>
    {/* ID Card Info on Right - Beside the character image */}
    <div className="w-3/5 h-full justify-center p-12 mt-10 -ml-1">
      <div className="space-y-3">
        <p className="text-lg"><strong>Name:</strong> {userName}</p>
        <p className="text-lg"><strong>Level:</strong> 1</p>
        <p className="text-lg"><strong>Exp:</strong> 0/100</p>
      </div>
    </div>
  </div>
</div>
          </div>


          {/* Back Side */}
          <div
  className="absolute w-full h-full bg-white text-black p-6 rounded-lg shadow-lg overflow-y-auto"
  style={{
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
  }}
>
  <button
    className="absolute top-2 right-2 text-lg font-bold z-10"
    onClick={(e) => {
      e.stopPropagation();
      onClose();
    }}
  >
    ×
  </button>
  <h2 className="text-xl font-bold mb-4 text-center">Achievements</h2>
  
  <div className="grid grid-cols-2 gap-3">
    {/* Photography Achievement */}
    <div className="rounded p-8 text-center">
      <img 
        src="/images/symbol/capture.png" 
        alt="Photography Achievement" 
        className="w-12 h-12 mx-auto mb-2 object-cover rounded"
      />
      <h3 className="font-semibold">Photography</h3>
    </div>
    
    {/* Map Explorer Achievement */}
    <div className="rounded p-4 text-center">
      <img 
        src="/images/symbol/explorer.png" 
        alt="Map Explorer Achievement" 
        className="w-12 h-12 mx-auto mb-2 object-cover rounded"
      />
      <h3 className="font-semibold">Map Explorer</h3>
    </div>
    
    {/* Treasure Collector Achievement */}
    <div className="rounded p-4 text-center">
      <img 
        src="/images/symbol/treasure.png" 
        alt="Treasure Collector Achievement" 
        className="w-12 h-12 mx-auto mb-2 object-cover rounded"
      />
      <h3 className="font-semibold">Collector</h3>
    </div>
    
    {/* Composition Achievement */}
    <div className="rounded p-4 text-center">
      <img 
        src="/images/symbol/composting.png" 
        alt="Composition Achievement" 
        className="w-12 h-12 mx-auto mb-2 object-cover rounded"
      />
      <h3 className="font-semibold">Composition</h3>
    </div>
  </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityCard;