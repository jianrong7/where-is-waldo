import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import ReturnHomeBtn from './ReturnHomeBtn';
import Header from './Header';

export default function GameHeader({ people }) {
    const [imgUrl, setImgUrl] = useState('');
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
            <ReturnHomeBtn/>
        </div>

    );
};