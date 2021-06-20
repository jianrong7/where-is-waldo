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
        <Link to='/' style={{ textDecoration: 'none' }} className='header'>
            <header>
                <img src={imgUrl} alt="waldo-header" />
                <span>Where's</span>
                <span>Waldo</span>
            </header>
        </Link> 
    );
};