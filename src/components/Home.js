import React, { useState, useEffect } from 'react';
import Levels from './Levels';

export default function Home({ levelData }) {
    const [levelDataHome, setLevelDataHome] = useState(levelData);

    useEffect(() => {
        setLevelDataHome(levelData);
    }, [])

    return(
        <div>
            {Object.keys(levelData).map((key, index) => {
                return (
                    <Levels levelData={levelData[key]} key={key + index}/>
                );
            })}
        </div>
    );  
};

    // const [imgUrls, setImgUrls] = useState([]);

    // const fetchLevelsPictures = async () => {
    //     let tempImgUrls = [];
    //     const response = await firebase.storage().ref('levels').listAll()
    //         .then(result => {
    //             result.items.forEach(imageRef => {
    //                 imageRef.getDownloadURL()
    //                 .then(url => {
    //                     tempImgUrls.push(url)
    //                 })
    //             })
    //         }).catch(error => {
    //             console.log(error)
    //     });
    //     setImgUrls(tempImgUrls)
    // }