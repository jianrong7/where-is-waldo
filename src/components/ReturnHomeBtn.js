import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function ReturnHomeBtn() {
    return(
        <div className={styles.returnHomeBtn}>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <span style={{ color: 'white' }}>Return Home</span>
            </Link>
        </div>
    );
};