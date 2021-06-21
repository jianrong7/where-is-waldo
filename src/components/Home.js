import React from 'react';
import Levels from './Levels';
import styles from './Home.module.css';

function Home({ setLevel, levelData }) {

    return(
        <div className={styles.home}>
            {Object.keys(levelData).map((key, index) => {
                return (
                    <Levels setLevel={setLevel} levelData={levelData[key]} key={key + index} />
                );
            })}
        </div>
    );  
};

export default Home;