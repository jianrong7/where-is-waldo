import React from 'react';
import styles from './Header.module.css';
import Header from './Header';

import { formatTime } from './utils/utils';

export default function GameHeader({ people, timer }) {
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