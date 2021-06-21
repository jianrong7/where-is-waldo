import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import GameHeader from './components/GameHeader';
import Game from './components/Game';

import './App.css';

import firebase from 'firebase';

function App() {
    const [level, setLevel] = useState(1);
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
        <div className='App'>
            <Router>
                <Switch>
                    <Route path='/game'>
                        <GameHeader level={level} levelData={levelData} />
                        <Game level={level} levelData={levelData} />
                    </Route>
                    <Route>
                        <Header />
                        <Home setLevel={setLevel} levelData={levelData}/>
                    </Route>
                </Switch>
            </Router>
        </div>
        
    );
}

export default App;
