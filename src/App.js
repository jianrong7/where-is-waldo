import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Game from './components/Game';
import Add from './components/Add';
import FireStoreData from './components/FireStoreData';
import { useGetData } from './hooks/useGetData';

import firebase from 'firebase';

function App() {
    const [levelData, setLevelData] = useState({});
    
    useEffect(() => {
        firebase.firestore()
        .collection('levels')
        .get()
        .then(querySnapshot => {
            let levelsObj = {};
            querySnapshot.forEach(doc => {
                const levelData = doc.data();
                levelsObj[levelData.level] = levelData
            });
            setLevelData(levelsObj);
        });
    }, [])

    return (
        
        <Router>
            <Switch>
                <Route path='/game'>
                    <Header />
                    <Game />
                </Route>
                <Route>
                    {/* <img src={imgUrl} alt=''></img> */}
                    <Header />
                    <Home levelData={levelData}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
