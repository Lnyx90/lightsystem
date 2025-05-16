import React, {use, useEffect, useState} from "react";
import "../css/Game.css"

function Game()
{
    const [player, setPlayer] = useState ({
        name: '',
        image: ''
    });

    useEffect(() => {
        const storedName = localStorage.getItem('playerName');
        const storedImage = localStorage.getItem('playerImage');

        setPlayer({
            name: storedName || 'Player',
            image: storedImage || '/images/wayang1.png'
        });
    }, []);

    const closePopUp = () => {
        const popUp = document.querySelector('#welcomePopUp');
        if(popUp) {
            popUp.style.display = 'none';
        }
    }

    return(
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full relative" id="welcomePopUp">
                <h2>
                    Welcome, <span className="break-words">{player.name}</span>
                </h2>
                <p className="text-sm mb-2">You Have Choosen: </p>    
                <img className="w-24 h-auto max-h-40 mx-auto mb-4 object-contain" src={player.image}/>
                <p>Time For an Epic Journey!</p>
                <button onClick={closePopUp}>Play</button>
            </div>
        </>
    )
}

export default Game;