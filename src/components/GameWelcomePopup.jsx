import React from "react";

function GameWelcomePopup({ player, showWelcomePopup, closePopUp }) {
	if (!showWelcomePopup) return null;
    return (
        <div className='flex items-center justify-center min-h-screen min-w-screen fixed z-100'>
				{showWelcomePopup && (
					<div>
						<div className='bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-xs relative'>
							<h2>Welcome, {player.name}!</h2>
							<p>You have chosen:</p>
							<img
								src={player.image}
								alt='Character'
								className='max-w-24 mx-auto'
							/>
							<p>Time for an Epic Journey!</p>
							<button
								className='bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-700'
								onClick={closePopUp}
							>
								Play
							</button>
						</div>
					</div>
				)}
			</div>
    );
}

export default GameWelcomePopup;