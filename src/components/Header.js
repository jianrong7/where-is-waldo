import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

export default function Header() {
    const [imgUrl, setImgUrl] = useState('');
    useEffect(() => {
        firebase.storage().ref().child('waldo-header.png').getDownloadURL().then(url => {
            setImgUrl(url);
        }).catch(error => {
            console.log('Error fetching image from Firebase Storage: ', error)
        });
    }, [])
    
    return(
        <Link to='/' style={{ textDecoration: 'none' }}>
            <header className={styles.header}>
                <img className={styles.headerImg} src={imgUrl} alt="waldo-header" />
                <span className={styles.headerText}>Where's</span>
                <span className={styles.headerText}>Waldo</span>
            </header>
        </Link> 
    );
};