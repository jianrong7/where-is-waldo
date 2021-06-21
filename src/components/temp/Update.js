import React, { useState } from 'react';
import firebase from 'firebase';

const Update = ({ doc }) => {
    const [value, setValue] = useState('');
    const db = firebase.firestore();
    const getValue = (e) => {
        setValue(e.target.value);
    };
    const updateValue = () => {
        db.collection('values').doc(doc).update({
            value: value,
        }).then(() => {
            console.log("Documen successfully uploaded!");
        }).catch(error => {
            console.log("Error updating document: ", error);
        })
    };

    return (
        <>
            <input onBlur={getValue} type='text' />
            <button type='button' onClick={updateValue}>Add</button>
        </>
    );
};

export default Update;