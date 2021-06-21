import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export default function Levels({ setLevel, levelData }) {
    return(
        <div>
            <Link to='/game' className={styles.level} style={{ textDecoration: 'none' }} onClick={() => setLevel(levelData.level)}>
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
            </Link>
        </div>

    );
};