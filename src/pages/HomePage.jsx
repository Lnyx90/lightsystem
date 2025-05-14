import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage()
{
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundImage = "url('/images/homepage.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundSize = "";
            document.body.style.backgroundPosition = "";
            document.body.style.backgroundRepeat = "";
            document.body.style.backgroundAttachment = "";
        };
    }, []);

    return (
        <>
            <div className="">
                <h2 className="text-2xl text-blue-900 font-bold leading-tight">Archipelago Adventure!</h2>
            </div>
            <div className="">
                <button onClick={() => navigate('/')} className="px-4 py-2.5 text-base font-semibold text-white bg-green-500 rounded-lg shadow-md">Start Game</button>
            </div>
        </>
        
    )
}

export default HomePage;