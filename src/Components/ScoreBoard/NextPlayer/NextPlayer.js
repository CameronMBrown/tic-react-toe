// components
import XSymbol from "../../Symbols/XSymbol";
import OSymbol from "../../Symbols/OSymbol";

// styles
import "./NextPlayer.scss"

export default function NextPlayer({ player }) {
    return (
        <div className="next-player-wrapper">
            <p>Next Player:</p>
            <div className="next-player-token">
                { 
                    player === "X" ? <XSymbol /> : <OSymbol />
                }
            </div>
        </div>
    )
}