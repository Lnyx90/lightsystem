import React, { useEffect, useState } from 'react';
import stats from '../js/Stats';
import '../css/Game.css';

function Game() {
	//Player
	const [player, setPlayer] = useState({ name: '', image: '' });

	//Date
	const [currentDate, setCurrentDate] = useState('');

	//Welcome Popup
	const [showWelcomePopup, setShowWelcomePopup] = useState(true);
	const closePopUp = () => setShowWelcomePopup(false);

	//Money
	const [money, setMoney] = useState(1000000);

	//Position, Step & Location
	const [position, setPosition] = useState({ x: 1000, y: 750 });
	const step = 10;
	const [locationText, setLocationText] = useState("You're Lost!");

	//Actions
	const [actions, setActions] = useState([]);

	//Map
	const [currentMap, setCurrentMap] = useState('default');

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
	const isMobile = window.innerWidth < 768;

	//UseEffects
	useEffect(() => {
		const storedName = localStorage.getItem('playerName');
		const storedImage = localStorage.getItem('PlayerImage');
		document.body.style.backgroundImage = "url('/images/background/newbg.gif')";

		setPlayer({
			name: storedName || 'Player',
			image: storedImage || '/images/symbol/wayang1.png',
		});

		const date = new Date();
		const formattedDate = date.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
		setCurrentDate(formattedDate);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			setPosition((prev) => {
				let { x, y } = prev;
				if (e.key === 'ArrowUp') y -= step;
				else if (e.key === 'ArrowDown') y += step;
				else if (e.key === 'ArrowLeft') x -= step;
				else if (e.key === 'ArrowRight') x += step;
				return { x, y };
			});
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		if (currentMap === 'default') {
			setLocationText("You're Lost!");
			setActions([]);
		} else if (currentMap === 'lake') {
			// Actions for lake map specific spots
			if (
				position.x > 50 &&
				position.x < 110 &&
				position.y > 90 &&
				position.y < 130
			) {
				setActions(['Sand Play', 'Buy Drink', 'Buy Snack', 'Pick-up Trash']);
			} else {
				setActions([]);
			}
		} else if (currentMap === 'beach') {
			// Actions for lake map specific spots
			if (
				position.x > 50 &&
				position.x < 110 &&
				position.y > 90 &&
				position.y < 130
			) {
				setActions(['Sand Play', 'Buy Drink', 'Buy Snack', 'Pick-up Trash']);
			} else {
				setActions([]);
			}
		}
	}, [currentMap, position]);

	//Movement
	const move = (direction) => {
		setPosition((prev) => {
			let { x, y } = prev;
			if (direction === 'up') y -= step;
			else if (direction === 'down') y += step;
			else if (direction === 'left') x -= step;
			else if (direction === 'right') x += step;
			return { x, y };
		});
	};
}
