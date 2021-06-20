import React from 'react';
import firebase from 'firebase';

const Delete = ({ doc }) => {
    const db = firebase.firestore();

    const deleteValue = () => {
        db.collection('values').doc(doc).delete().then(() => {
            console.log("Document successfully deleted!")
        }).catch(error => {
            console.log("Error removing document: ", error);
        });
    };

    return <button onClick={deleteValue}>Delete</button>
};

export default Delete;