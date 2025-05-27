import React, { useEffect, useState } from 'react';
import stats from '../js/Stats';
import '../css/Game.css';
import useGameTime from './gametime';
import { isColliding } from './colliding';
import GameTitleBar from '../components/GameTitleBar';
import GameStatusBar from '../components/GameStatusBar';
import GameWelcomePopup from '../components/GameWelcomePopup';

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
		200
	);
	const offsetY = clamp(
		-position.y + viewportHeight / 2,
		-mapHeight + viewportHeight,
		200
	);

	const mapImages = {
		default: '/images/background/map.png',
		lake: '/images/background/lake.jpg',
		beach: '/images/background/beach.gif',
		mountain: '/images/background/mountain.jpeg',
		temple: '/images/background/temple.jpg',
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
	setTimeout(() => setIsShaking(false), 300); 
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
		triggerShake();
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
		// Lake entry zone
		if (
			position.x > 1630 && position.x < 1885 &&
			position.y > 1095 && position.y < 1125
		) {
			setCurrentMap('lake');
			setPosition({ x: 100, y: 100 });
			setActions([]);
			setLocationText('Welcome to Lake Toba');
		}
		// Beach entry zone
		else if (
			position.x > 510 && position.x < 610 &&
			position.y > 900 && position.y < 1170
		) {
			setCurrentMap('beach');
			setPosition({ x: 100, y: 100 });
			setActions([]);
			setLocationText('Welcome to Kuta Beach');
		}
		// Mountain entry zone
		else if (
			position.x > 490 && position.x < 510 &&
			position.y > 390 && position.y < 410
		) {
			setCurrentMap('mountain');
			setPosition({ x: 100, y: 100 });
			setActions([]);
			setLocationText('Welcome to the Mountain');
		}
		// Temple entry zone
		else if (
			position.x > 1440 && position.x < 1460 &&
			position.y > 340 && position.y < 360
		) {
			setCurrentMap('temple');
			setPosition({ x: 100, y: 100 });
			setActions([]);
			setLocationText('Welcome to the Borobudur Temple');
		}
	} 
	else if (currentMap === 'lake') {
		if (
			position.x > 999 && position.x < 1049 &&
			position.y > 199 && position.y < 249
		) {
			setCurrentMap('home');
			setPosition({ x: 100, y: 100 });
			setActions([]);
			setLocationText('Welcome Home');
		}

		else if (
			position.x > 299 && position.x < 351 &&
			position.y > 99 && position.y < 149
		) {
			setActions(['Enter Bites and Tickets Shop']);
			setLocationText('You are near a shop');
		}
		else if (
			position.x > 1249 && position.x < 1301 &&
			position.y > 599 && position.y < 610
		) {
			setActions(['Enter Dockside Shop']);
			setLocationText('You are near a shop');
		}else if (
			position.x > 1049 && position.x < 1301 &&
			position.y > 849 && position.y <  901
		) {
			setActions(['sightseeing',' fishing', 'take pictures']);
			setLocationText('You are near a shop');
		}
		else {
		 setActions([]);
		}
	}
	else if (currentMap === 'mountain') {
		if (
		Math.sqrt((position.x - 1160) ** 2 + (position.y - 50) ** 2) < 80
		) {
		setActions([
			'Enjoy the View',
			'Capture the Moment',
			'Rest & Eat Snacks',
			'Hiking Journaling'
		]);
		setLocationText('You are at the Mountain Peak');
		}

		else if (
		Math.sqrt((position.x - 1110) ** 2 + (position.y - 800) ** 2) < 120
		) {
		setActions([
			'Hiking',
			'Observe Nature',
			'Collect Firewood',
			'Gather Spring Water'
		]);
		setLocationText('You are on the Mountain Slope');
		}

		else if (
		Math.sqrt((position.x - 1740) ** 2 + (position.y - 1125) ** 2) < 80
		) {
		setActions([
			'Set Up Tent',
			'Cook Food',
			'Build a Campfire',
			'Talk to Fellow Campers'
		]);
		setLocationText('You are at the Campground');
		}
		else {
		setActions([]);
		setLocationText('');
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
			<GameWelcomePopup
				player={player}
				showWelcomePopup={showWelcomePopup}
				closePopUp={closePopUp}
				/>

			<GameTitleBar formattedDate={formattedDate} />
			<GameStatusBar stats={stats} />
		
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
									: currentMap === 'temple'
									? "url('/images/background/temple.jpg')"
									: currentMap === 'mountain'
									? "url('/images/background/mountain.jpeg')"
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