import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function GameHeader({ people, timer }) {
    const [imgUrl, setImgUrl] = useState('');
    useEffect(() => {
        firebase.storage().ref().child('waldo-header.png').getDownloadURL().then(url => {
            setImgUrl(url);
        }).catch(error => {
            console.log('Error fetching image from Firebase Storage: ', error)
        });
    }, [])
    const formatTime = (time) => {
        const getSeconds = `0${Math.round(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
      
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };
    
    return(
        <div className={styles.mainHeader}>
            <div className={styles.gameHeader}>
                {Object.keys(people).map(person => {
                    let currentPersonData = people[person];
                    if (currentPersonData.found) {
                        return (
                            <div key={currentPersonData.name} className={styles.gameHeaderDetailsFound}>
                                <img src={currentPersonData.imgurl} alt={currentPersonData.name} className={styles.gameHeaderImg} />
                                <span>{currentPersonData.name}</span>
                            </div>
                        );
                    } else {
                        return (
                            <div key={currentPersonData.name} className={styles.gameHeaderDetails}>
                                <img src={currentPersonData.imgurl} alt={currentPersonData.name} className={styles.gameHeaderImg} />
                                <span>{currentPersonData.name}</span>
                            </div>
                        );
                    }
                })}
            </div>
            <Header />
            <div className={styles.timer}>
                {formatTime(timer)}
            </div>
        </div>

    );
};