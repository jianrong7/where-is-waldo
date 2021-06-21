import React, { useEffect, useState } from 'react';
import styles from './Game.module.css';
import OutsideClickHandler from 'react-outside-click-handler';
import CharacterDropdown from './CharacterDropdown';

export default function Game({ level, levelData }) {
    const [gameData, setGameData] = useState(levelData[level]);
    const [clickedCoords, setClickedCoords] = useState({});
    const [showDropDown, setShowDropdown] = useState(false);

    const imageClick = (e) => {
        const xCoord = e.clientX;
        const yCoord = e.clientY;
        setClickedCoords({ xCoord, yCoord });
        setShowDropdown(true);
    };
    const hideDropdown = (e) => {
        setShowDropdown(false);
    };
    useEffect(() => {
        if (showDropDown) {
            console.log("TODO: SHOW DROP DOWN")
        } else if (!showDropDown) {
            console.log("DROPDOWN HIDDEN")
        }
    }, [showDropDown])

    return(
        <div className={styles.gameDataDiv}>
            <OutsideClickHandler onOutsideClick={hideDropdown}>
                <img
                    src={gameData.imgurl}
                    alt={gameData.storageuri}
                    className={styles.gamePic}
                    onClick={imageClick}
                />
                <CharacterDropdown
                    showDropdown={showDropDown}
                    clickedCoords={clickedCoords}
                    gameData={gameData}
                />
            </OutsideClickHandler>

        </div>
    );  
};