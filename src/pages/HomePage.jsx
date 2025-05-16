import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundImage = "url('public/images/backgroundhomapage2.gif')";
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
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-6 text-glow text-glow-pulse">Archipelago Adventure!</h2>

                <button
                 onClick={() => navigate('/PickChar')}
                    className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-601 transition button-float"
                    >
                    Start Game
                </button>
            </div>
        </div>
    );
}

export default HomePage;
