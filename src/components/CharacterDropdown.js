import React, { useState } from 'react';
import styles from './Game.module.css';

export default function CharacterDropdown({ showDropdown, clickedCoords, gameData }) {
    const [gameDataPeople, setGameDataPeople] = useState(gameData.people)

    if(showDropdown) {
        return(
            <ul className={styles.dropdownContainer} style={{ left: clickedCoords.xCoord, top: clickedCoords.yCoord }}>
                {Object.keys(gameDataPeople).map((person, index) => {
                    console.log(person)
                    let currentPersonData = gameDataPeople[person];
                    console.log(currentPersonData)
                    return(
                        <li key={index} className={styles.dropdownList}>
                            <img src={currentPersonData.imgurl} alt={currentPersonData.name} className={styles.dropdownImg}/>
                            {currentPersonData.name}
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return(null);
    }

};