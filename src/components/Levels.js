import React from 'react';
import styles from './pages/Home.module.css';
import { Link } from 'react-router-dom';

export default function Levels({ levelData }) {
    return(
        <div>
                <div className={styles.imgItem}>
                    <img src={levelData.imgurl} alt={`level-${levelData.level}`} className={styles.levelImg}/>
                </div>
                <div className={styles.levelDetails}>
                    <p>Level {levelData.level}</p>
                    <div>
                        {Object.keys(levelData.people).map(person => {
                            const currentPersonData = levelData.people[person];
                            return (
                                <img key={levelData.level + currentPersonData.name} src={currentPersonData.imgurl} alt={currentPersonData.name} className={styles.levelPersonImg}/>
                            );
                        })}
                    </div>

                </div>
        </div>

    );
};