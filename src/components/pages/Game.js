import React, { useEffect, useState } from 'react';
import styles from './Game.module.css';
import OutsideClickHandler from 'react-outside-click-handler';
import CharacterDropdown from '../CharacterDropdown';
import GameHeader from '../GameHeader';
import Modal from '../Modal';

import firebase from 'firebase';
import { clone } from 'lodash';
import { checkValid } from '../utils/utils';

export default function Game({ level, levelData }) {
    const [gameData, setGameData] = useState(levelData[level]);
    const [clickedCoords, setClickedCoords] = useState({});
    const [clickedCoordsPercentage, setClickedCoordsPercentage] = useState({});
    const [showDropDown, setShowDropdown] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameID, setGameID] = useState(null);
    const [timer, setTimer] = useState(0);
    const [serverTimer, setServerTimer] = useState(0);

    useEffect(() => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        firebase.firestore()
            .collection('games')
            .add({
                startTime: timestamp,
                level,
                people: gameData.people
            }).then(docRef => {
                setGameID(docRef.id);
            })
    }, []);
    useEffect(() => {
        // check if every char is found
        for(const prop in gameData.people) {
            if(!gameData.people[prop]?.found) {
                setIsGameOver(false)
                console.log(isGameOver)
                return
            }
        }
        setIsGameOver(true)
    }, [gameData, isGameOver]);
    useEffect(() => {
        let interval;
        if (!isGameOver) {
            interval = setInterval(() => {
                setTimer(timer => timer + 1);
            }, 1000);
        } else if (isGameOver) {
            console.log(isGameOver)
            clearInterval(interval);
            setTimer(0);
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            firebase.firestore()
                .collection('games')
                .doc(gameID)
                .set({
                    endTime: timestamp
                }, { merge: true })
                .then(docRef => {
                    firebase.firestore()
                        .collection('games')
                        .doc(gameID)
                        .onSnapshot(doc => {
                            setServerTimer(doc.data().endTime?.seconds - doc.data().startTime?.seconds)
                        })
                })
        }
        return () => {
            clearInterval(interval);
        };
    }, [isGameOver]);

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
    const dropdownClick = (person) => {
        const coordsArr =  gameData['people'][person].coords.split(',');
        const valid = checkValid(parseInt(coordsArr[0]), clickedCoordsPercentage.xCoord) && checkValid(parseInt(coordsArr[1]), clickedCoordsPercentage.yCoord);
        if (valid) {
            // update gameData with found person
            const personDict = gameData.people[person];
            gameData.people[person] = {...personDict, found: true };
            setGameData(clone(gameData));
        }
        setShowDropdown(false);
    };
    const handleSubmit = (username) => {
        firebase.firestore()
            .collection('leaderboard' + level)
            .add({
                username,
                time: serverTimer
            })
        console.log(username)
    }


    if (gameData === null) {
        return(null)
    } else {
        return(
            <>
                <GameHeader people={gameData.people} timer={timer}/>
                <div className={styles.gameDataDiv}>
                    <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
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
                {isGameOver === true ? <Modal timer={serverTimer} handleSubmit={handleSubmit}/> : null}
            </>
        );  
    }

};