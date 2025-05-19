import React, { useEffect, useState } from 'react';
import stats from '../js/Stats';
import '../css/Game.css';
import useGameTime from './gametime';
import { isColliding } from './colliding';

function Game() {
	//Player
	const [player, setPlayer] = useState({ name: '', image: '' });

	//Date
	const { gameTime, formattedDate, formattedTime, greeting } = useGameTime(10);


	//Welcome Popup
	const [showWelcomePopup, setShowWelcomePopup] = useState(true);
	const closePopUp = () => setShowWelcomePopup(false);

	//Money
	const [money, setMoney] = useState(1000000);

	//Position, Step & Location
	const step = 50;
	const [position, setPosition] = useState({ x: 1000, y: 750 });
	const [locationText, setLocationText] = useState("You're Lost!");

	//Actions
	const [actions, setActions] = useState([]);

	//Map
	const [imageLoaded, setImageLoaded] = useState(false);
	const [currentMap, setCurrentMap] = useState('default');
	const [isShaking, setIsShaking] = useState(false);

	const mapWidth = 2000;
	const mapHeight = 1500;
	const viewportWidth = 500;
	const viewportHeight = 500;

	const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
	const offsetX = clamp(
		-position.x + viewportWidth / 2,
		-mapWidth + viewportWidth,
		0
	);
	const offsetY = clamp(
		-position.y + viewportHeight / 2,
		-mapHeight + viewportHeight,
		0
	);

	const mapImages = {
		default: '/images/background/map.png',
		lake: '/images/background/lake.jpg',
		beach: '/images/background/beach.gif',
	};

	//Mobile S
	const isMobile = window.innerWidth < 768;

	//UseEffects
	useEffect(() => {
		const storedName = localStorage.getItem('playerName');
		const storedImage = localStorage.getItem('PlayerImage');
		document.body.style.backgroundImage = "url('/images/background/newbg.gif')";

		setPlayer({
			name: storedName || 'Player',
			image: storedImage || '/images/symbol/wayang1.png',
		});

    //collision 
    const trees = [
      { x: 175, y: 315 },
      { x: 265, y: 345 },
      { x: 190, y: 390 },
      { x: 355, y: 435 },
      { x: 280, y: 480 },
      { x: 295, y: 510 },
      { x: 370, y: 585 },
      { x: 520, y: 570 },
      { x: 580, y: 405 },
      { x: 655, y: 405 },
      { x: 760, y: 375 },
      { x: 835, y: 345 },
      { x: 790, y: 420 },
      // add more trees here
    ];

	const triggerShake = () => {
	setIsShaking(true);
	setTimeout(() => setIsShaking(false), 300); // durasi shake
	};

		const handleKeyDown = (e) => {
			setPosition((prev) => {
				let { x, y } = prev;
				if (e.key === 'ArrowUp') y -= step;
				else if (e.key === 'ArrowDown') y += step;
				else if (e.key === 'ArrowLeft') x -= step;
				else if (e.key === 'ArrowRight') x += step;
        const clampedX = clamp(x, 0, mapWidth);
		const clampedY = clamp(y, 0, mapHeight);

		if (clampedX !== x || clampedY !== y) {
		triggerShake(); // getar jika mentok
		return prev;
		}

		if (currentMap === 'default' && isColliding(clampedX, clampedY, trees, 30)) {
		return prev;
		}

		return { x: clampedX, y: clampedY };
			});
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		if (currentMap === 'default') {
			if (
				position.x > 1630 &&
				position.x < 1885 &&
				position.y > 1095 &&
				position.y < 1125
			) {
				setCurrentMap('lake');
				setPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to Lake Toba');
			} else if (
				position.x > 510 &&
				position.x < 610 &&
				position.y > 900 &&
				position.y < 1170
			) {
				setCurrentMap('beach');
				setPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to Kuta Beach');
			}
		}
	}, [position, currentMap]);

	//Movement
	const move = (direction) => {
		setPosition((prev) => {
			let { x, y } = prev;
			if (direction === 'up') y -= step;
			else if (direction === 'down') y += step;
			else if (direction === 'left') x -= step;
			else if (direction === 'right') x += step;
			const clampedX = clamp(x, 0, mapWidth);
			const clampedY = clamp(y, 0, mapHeight);

			if (clampedX !== x || clampedY !== y) {
			triggerShake();
			return prev;
			}

			return { x: clampedX, y: clampedY };
		});
	};

  
  

	return (
		<div className=''>
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

			<div className='fixed mt-4 flex justify-center w-full px-4 pt-4 '>
				<div className='flex flex-wrap items-center justify-center min-w-24 min-h-10 gap-4 sm:gap-8 bg-blue-900 text-white rounded-lg px-2'>
					<span className='text-[5px] md:text-[10px] lg:text-base'>
						Archipelago Adventure
					</span>
					<button className='text-[5px] md:text-[10px] lg:text-base'>
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

			<div className='fixed mt-20 flex justify-center w-full px-4'>
				<div className='flex flex-wrap items-center justify-center p-1 rounded-lg gap-5'>
					{stats.map(({ icon, value, color }, index) => (
						<div
							key={index}
							className='flex items-center gap-2 rounded-lg bg-white border-1 border-black p-1'
						>
							<img
								src={`/images/symbol/${icon}.png`}
								alt={icon}
								className='w-2 h-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mt-0.5'
							/>
							<div className='flex-1 relative'>
								<div className='h-1 md:h-2 lg:h-3 w-10 md:w-20 lg:w-30 bg-gray-300 rounded-full overflow-hidden'>
									<div
										className={`h-1 md:h-2 lg:h-3 lg:w-50 ${color} transition-all duration-300`}
										style={{ width: `${value}%` }}
									/>
								</div>
							</div>
							<span className='text-[3px] md:text-[6px] lg:text-base mt-1'>
								{value}%
							</span>
						</div>
					))}
				</div>
			</div>

		
			<div className='fixed flex flex-wrap flex-row justify-center w-full mt-40 lg:mt-50'>
				<div
				className={`map-container relative w-[${viewportWidth}px] h-[${viewportHeight}px] overflow-hidden ${
					isShaking ? 'shake' : ''
				}`}
				>
				<div className=' w-[200px] h-[250px] md:w-[400px] md:h-[450px] lg:w-[700px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg'>
					<div
						className=' transition-transform scale-y-132 scale-x-123 duration-300relative'
						style={{
							width: `${mapWidth}px`,
							height: `${mapHeight}px`,
							backgroundImage:
								currentMap === 'default'
									? "url('/images/background/map.png')"
									: currentMap === 'lake'
									? "url('/images/background/lake.jpg')"
									: currentMap === 'beach'
									? "url('/images/background/beach.gif')"
									: 'none',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							transform: `translate(${offsetX}px, ${offsetY}px) scale(${
								isMobile ? 0.6 : 1
							})`,
						}}
					>
						<div
							id='player'
							className='fixed transition-all top-1/2 left-1/2 duration-300'
							style={{
								left: `${position.x}px`,
								top: `${position.y}px`,
								zIndex: 10,
							}}
						>
							<p
								className='text-gray-800 px-1 py-0.5 rounded text-[8px] font-semibold'
								style={{
									position: 'absolute',
									bottom: '100%',
									transform: 'translate(-50%, -50%)',
									left: '50%',
								}}
							>
								{player.name}
							</p>
							<img
								src={player.image}
								alt='Player'
								width='35'
								className={`rounded-full transition-all duration-700 ease-out transform ${
									imageLoaded
										? 'opacity-100 scale-100 translate-y-0'
										: 'opacity-0 scale-50 translate-y-4'
								}`}
								onLoad={() => setImageLoaded(true)}
							/>
						</div>
					</div>
				</div>
				</div>

				<div
				id='location'
				className='bg-white p-4 rounded-lg shadow-lg 
							w-full sm:w-72 md:w-80 lg:w-80 
							h-auto sm:h-[26rem] md:h-[28rem] lg:h-[28rem]
							mt-4 sm:mt-4 md:mt-0 lg:mt-0
							ml-3 sm:ml-0 md:ml-3 lg:ml-3 mr-3'
				>
				<div className='text-center text-sm sm:text-base font-semibold mb-4'>
					<div className='fixed bottom-4 left-4 bg-white p-2 rounded shadow text-[10px] sm:text-xs md:text-sm'>
					X: {position.x}, Y: {position.y}
					</div>

					{currentMap === 'default' ? "You're Lost!" : locationText}
				</div>

				<div className='flex items-center justify-center mb-4'>
					<img src='/images/symbol/time.png' alt='day' className='w-6 h-6 sm:w-8 sm:h-8' />
          <span>{formattedTime}</span>
				</div>
        <div className='flex items-center justify-center mb-4'>
        <span className='text-[5px] md:text-[10px] lg:text-base'>{greeting}</span>
        </div>

				{actions.length > 0 ? (
					actions.map((action, i) => (
					<button
						key={i}
						className='w-full bg-blue-500 
								text-[10px] sm:text-xs md:text-sm 
								text-white p-2 mt-2 rounded-lg hover:bg-blue-600'
						onClick={() => console.log(`Action: ${action}`)}
					>
						{action}
					</button>
					))
				) : (
					<div className='text-center text-xs text-gray-600 mt-2'>
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
					className='w-full mt-4 bg-red-500 hover:bg-red-700 text-white rounded-lg py-2 text-xs sm:text-sm'
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