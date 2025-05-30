import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import PickCharAudio from '../hooks/PickCharAudio';
import CharacterSelection from '../components/PickCharCharacterSelection';
import LevelSelection from '../components/PickCharLevelSelection';
import Notification from '../components/PickCharNotification';

import '../css/PickChar.css';

function PickChar() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [playerName, setPlayerName] = useState('');
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [showLevelSelection, setShowLevelSelection] = useState(false);
	const [isFading, setIsFading] = useState(false);
	const navigate = useNavigate();

	const { bgMusicRef, clickSoundRef, playClickSound } = PickCharAudio();

	const characters = [
		'/images/characters/Wayang1.png',
		'/images/characters/Wayang2.png',
		'/images/characters/Wayang3.png',
	];

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

	const handleNameChange = (e) => setPlayerName(e.target.value);

	const handleSelectAndNavigate = () => {
		if (!playerName.trim()) {
			setNotificationMessage('Please enter your name!');
			setShowNotification(true);
			return;
		}
		playClickSound();
		setShowLevelSelection(true);
	};

	const handleLevelSelect = (level) => {
		playClickSound();
		localStorage.setItem('PlayerImage', characters[currentIndex]);
		localStorage.setItem('playerName', playerName);
		localStorage.setItem('gameLevel', level);
		navigate('/game');
	};

	return (
		<div
			className='w-screen h-screen bg-cover bg-center flex items-center justify-center relative'
			style={{
				backgroundImage: "url('/images/background/PickCharBackground.gif')",
			}}
		>
			<audio ref={bgMusicRef} src='/audio/bgm.mp3' loop />
			<audio ref={clickSoundRef} src='/audio/click.mp3' />

			<div className='flex flex-col items-center text-center px-4 w-full max-w-4xl z-10'>
				<h1
					className='text-xl sm:text-3xl md:text-5xl text-glow-pickchar text-white leading-tight text-pulse-pickchar mb-6'
					style={{ fontFamily: "'Press Start 2P', cursive" }}
				>
					Choose Your <br /> Character
				</h1>

				<CharacterSelection
					characters={characters}
					currentIndex={currentIndex}
					isFading={isFading}
					onPrev={prevCharacter}
					onNext={nextCharacter}
				/>

				<input
					type='text'
					value={playerName}
					onChange={handleNameChange}
					placeholder='Enter Your Name'
					className='px-3 sm:px-4 py-2 text-sm sm:text-lg border-2 border-blue-800 rounded-md text-center w-40 sm:w-64 md:w-72 placeholder:text-xs sm:placeholder:text-sm mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>

				<button
					onClick={handleSelectAndNavigate}
					className='px-5 sm:px-8 py-2 sm:py-4 bg-blue-800 text-white text-sm sm:text-xl rounded-full shadow-lg hover:bg-blue-500 transition hover:scale-110'
				>
					Select Character
				</button>

				{showNotification && (
				<div className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-200 flex items-center">
					<img src="/images/symbol/alert.png" className="w-8 h-8 mr-2" alt="alert" />
					{notificationMessage}
				</div>
				)}
			</div>

			{showLevelSelection && (
				<LevelSelection
					onSelect={handleLevelSelect}
					onClose={() => setShowLevelSelection(false)}
				/>
			)}
		</div>
	);
}
export default PickChar;
