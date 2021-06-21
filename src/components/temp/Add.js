import React, { useState } from 'react';
import firebase from 'firebase';

const Add = () => {
    const [value, setValue] = useState('');
    const db = firebase.firestore();

    const getValue = (e) => {
        setValue(e.target.value);
    };

    const addValue = () => {
        db.collection('values').doc(value).set({
            value: value,
        }).then(() => {
            console.log("Value successfully written!")
        }).catch((error) => {
            console.log("Error writing Value: ", error);
        });
    };

    return (
        <div>
            <input onBlur={getValue} type='text' />
            <button type='button' onClick={addValue}>Add</button>
        </div>
    );
}

export default Add;