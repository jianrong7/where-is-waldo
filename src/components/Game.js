import React, { useEffect, useState } from 'react';
import styles from './Game.module.css';
import OutsideClickHandler from 'react-outside-click-handler';
import CharacterDropdown from './CharacterDropdown';

    // level 1
        // waldo: 53 49
        // odlaw: 24 50
        // wizard: 63 49
    // level 2
        // waldo: 85 30
    // level 3
        // waldo: 96 7
        // odlaw: 92 58
        // wizard: 29 42

export default function Game({ level, levelData }) {
    const [gameData, setGameData] = useState(levelData[level]);
    const [clickedCoords, setClickedCoords] = useState({});
    const [clickedCoordsPercentage, setClickedCoordsPercentage] = useState({});
    const [showDropDown, setShowDropdown] = useState(false);

    const imageClick = (e) => {
        const xCoord = Math.round(
            (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
        );
        const yCoord = Math.round(
            (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
        );
        const styleXCoord = e.clientX;
        const styleYCoord = e.clientY;
        setClickedCoords({ styleXCoord, styleYCoord });
        setClickedCoordsPercentage({ xCoord, yCoord });
        setShowDropdown(true);
    };
    const hideDropdown = (e) => {
        setShowDropdown(false);
    };
    const checkValid = (storedCoord, tryCoord) => {
        return(
            storedCoord === tryCoord ||
            storedCoord + 1 === tryCoord ||
            storedCoord + 2 === tryCoord ||
            storedCoord - 1 === tryCoord ||
            storedCoord - 2 === tryCoord
        );
    }
    const dropdownClick = (person) => {
        const coordsArr =  gameData['people'][person].coords.split(',');
        const valid = checkValid(parseInt(coordsArr[0]), clickedCoordsPercentage.xCoord) && checkValid(parseInt(coordsArr[1]), clickedCoordsPercentage.yCoord);
        if (valid) {
            console.log("YESSIR")
        }
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
                    clicked={dropdownClick}
                />
            </OutsideClickHandler>

        </div>
    );  
};