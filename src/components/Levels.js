import React from 'react';
import { Link } from 'react-router-dom';

export default function Levels({ levelData }) {
    return(
        <Link to='/game'>
            <button>
                <img src={levelData.imgurl} alt={`level-${levelData.level}`}/>
                <p>Level {levelData.level}</p>
            </button>
        </Link>
    );
};