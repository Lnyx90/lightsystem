import React, { useState } from "react";

function IdentityCard({ onClose }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-50">
      <div
        className="relative w-80 h-60"
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
            className="absolute w-full h-full bg-white text-black p-6 rounded-lg shadow-lg"
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
            <h2 className="text-xl font-bold mb-4">Identity Card</h2>
            <p><strong>Name:</strong> Player One</p>
            <p><strong>Level:</strong> 1</p>
            <p><strong>Status:</strong> Healthy</p>
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-full bg-white text-black p-6 rounded-lg shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {flipped && (
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
            <h2 className="text-xl font-bold mb-4">Achievements</h2>
            <ul className="list-disc list-inside">
              <li>First Quest Completed</li>
              <li>Island Explorer</li>
              <li>Master of Puzzles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityCard;
