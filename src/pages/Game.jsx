import React, { useEffect, useState } from 'react';
import '../css/Game.css';

function Game() {
	const [player, setPlayer] = useState({
		name: '',
		image: '',
	});

	const [currentDate, setCurrentDate] = useState(0);

	const closePopUp = () => {
		const popUp = document.getElementById('welcomePopUp');
		if (popUp) {
			popUp.style.display = 'none';
		}
	};

	useEffect(() => {
		const storedName = localStorage.getItem('playerName');
		const storedImage = localStorage.getItem('playerImage');

		setPlayer({
			name: storedName || 'Player',
			image: storedImage || '/images/wayang/wayang1.png',
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

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center scale-factor'>
			<div
				className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 px-4'
				id='welcomePopUp'
			>
				<div className='bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-xs relative'>
					<h2 className='text-lg font-bold mb-2'>
						Welcome, <span className='break-words'>{player.name}</span>!
					</h2>
					<p className='text-sm mb-2'>You have chosen:</p>
					<img
						src={player.image}
						alt='Character'
						className='w-24 h-auto max-h-40 mx-auto mb-4 object-contain'
					/>
					<p className='text-sm mb-4'>Time for an Epic Journey!</p>
					<button
						className='bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200'
						onClick={closePopUp}
					>
						Play
					</button>
					<audio
						id='click-sound'
						src='/assets/bg-music/click.mp4'
						preload='auto'
					/>
				</div>
			</div>

			<div className='w-full h-full flex flex-col items-center justify-center bg-cover bg-center'>
				<div className='fixed top-2 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl bg-blue-900 text-white p-2 rounded-lg flex justify-between items-center shadow-lg'>
					<span className='text-base font-bold'>Archipelago Adventure</span>
					<button className='z-50 text-base fle'>
						Level <span>1</span>
					</button>

					<div className='flex flex-col min-w-max'>
						<div className='flex items-center'>
							<img src='/images/symbol/calendar.png' className='w-10 h-10' />
							<span className='text-base ml-2'>{currentDate}</span>
						</div>
					</div>
				</div>

                <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='w-11/12 max-w-md rounded-lg p-4 shadow-2xl relative'>
                    <button className='absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold'></button>
                    </div>
                </div>
			</div>
		</div>
	);
}

export default Game;
