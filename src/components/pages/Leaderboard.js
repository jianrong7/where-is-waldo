import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Home from './Home';
import firebase from 'firebase';
import Levels from '../Levels';
import LeaderboardTable from '../LeaderboardTable';
import styles from './Home.module.css';

export default function Leaderboard({ levelData }) {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        firebase.firestore()
            .collection('leaderboard' + currentLevel)
            .get()
            .then(querySnapshot => {
                let leaderboardArr = [];
                querySnapshot.forEach(doc => {
                    leaderboardArr.push(doc.data())
                });
                setLeaderboard(leaderboardArr);
            });
    }, [currentLevel])

    const selectLevel = (level) => {
        setCurrentLevel(level)
    };
    
    if (leaderboard === null) {
        return (
            <>  
                <Header />
                <p>Leaderboard</p>
                <div className={styles.home}>
                    {Object.keys(levelData).map((key, index) => {
                        return (
                            <Levels levelData={levelData[key]} key={key + index}/>
                        );
                    })}
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header />
                <p className={styles.leaderboardTitle}>Leaderboard</p>
                <div className={styles.home}>
                    {Object.keys(levelData).map((key, index) => {
                        if (parseInt(key) === currentLevel) {
                            return (
                                <div key={key + index} onClick={() => selectLevel(index + 1)} className={styles.selectedLeaderboardLevel}>
                                    <Levels levelData={levelData[key]}/>
                                </div>
                            );
                        } else {
                            return (
                                <div key={key + index} onClick={() => selectLevel(index + 1)} className={styles.leaderboardLevel}>
                                    <Levels levelData={levelData[key]}/>
                                </div>
                            );
                        }                        
                    })}
                </div>
                <LeaderboardTable leaderboard={leaderboard} />
            </>
        );
    }
};