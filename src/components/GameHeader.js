import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import ReturnHomeBtn from './ReturnHomeBtn';

export default function GameHeader({ level, levelData }) {
    const [imgUrl, setImgUrl] = useState('');
    const [gameData, setGameData] = useState(levelData[level].people);
    useEffect(() => {
        firebase.storage().ref().child('waldo-header.png').getDownloadURL().then(url => {
            setImgUrl(url);
        }).catch(error => {
            console.log('Error fetching image from Firebase Storage: ', error)
        });
    }, [])
    
    return(
        <div className={styles.mainHeader}>
            <div className={styles.gameHeader}>
                {Object.keys(gameData).map(person => {
                    let currentPersonData = gameData[person];
                    return (
                        <div key={gameData[person].name} className={styles.gameHeaderDetails}>
                            <img src={currentPersonData.imgurl} alt={currentPersonData.name} className={styles.gameHeaderImg} />
                            <span>{currentPersonData.name}</span>
                        </div>
                    );
                })}
            </div>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <header className={styles.header}>
                    <img className={styles.headerImg} src={imgUrl} alt="waldo-header" />
                    <span className={styles.headerText}>Where's</span>
                    <span className={styles.headerText}>Waldo</span>
                </header>
            </Link>
            <ReturnHomeBtn/>
        </div>

    );
};