import React from 'react';
import Levels from '../Levels';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home({ setLevel, levelData }) {

    return(
        <>
            <div className={styles.home}>
                {Object.keys(levelData).map((key, index) => {
                    return (
                        <Link to='/game' className={styles.level} style={{ textDecoration: 'none' }} onClick={() => setLevel(key)} key={key + index}>
                            <Levels setLevel={setLevel} levelData={levelData[key]} />
                        </Link>
                    );
                })}
            </div>
            <div>
                <div className={styles.leaderboardDivContent}>
                    <div>
                        View the Leaderboard.
                    </div>
                    <Link to='/leaderboard'>
                        <button>
                            View Leaderboard
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );  
};

export default Home;