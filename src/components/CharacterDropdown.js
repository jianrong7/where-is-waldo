import React, { useState } from 'react';
import styles from './Game.module.css';

export default function CharacterDropdown({ showDropdown, clickedCoords, gameData, clicked }) {
    const [gameDataPeople, setGameDataPeople] = useState(gameData.people)

    if(showDropdown) {
        return(
            <ul className={styles.dropdownContainer} style={{ left: clickedCoords.styleXCoord, top: clickedCoords.styleYCoord }}>
                {Object.keys(gameDataPeople).map((person) => {
                    let currentPersonData = gameDataPeople[person];
                    return(
                        <li key={person} className={styles.dropdownList} onClick={() => clicked(person)}>
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