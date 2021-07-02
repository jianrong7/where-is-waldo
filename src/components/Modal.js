import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { Link, Redirect } from 'react-router-dom';

export default function Modal({ timer, handleCancel, handleSubmit }) {
    const [username, setUsername] = useState('');

    const handleChange = (e) => {
        setUsername(e.target.value)
    }
    const handleModalCancel = () => {
        handleCancel();
    }
    const handleModalSubmit = (e) => {
        handleSubmit(username);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    You finished in {timer} seconds!
                </div>
                <div className={styles.modalBody}>
                    <p>Enter your name to save your score on the global leaderboard.</p>
                    <form>
                        <label>
                            Username: 
                            <input type="text" onChange={handleChange}/>
                        </label>
                    </form>
                </div>
                <div className={styles.modalFooter}>
                    <Link to='/' onClick={handleModalCancel} className={styles.modalButton}>Cancel</Link>
                    <Link to='/leaderboard' onClick={handleModalSubmit} className={styles.modalButton}>Submit</Link>
                </div>
            </div>
        </div>
    );
};