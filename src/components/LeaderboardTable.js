import React, { useEffect, useState } from 'react';
import styles from './pages/Home.module.css';
import { clone } from 'lodash';

export default function LeaderboardTable({ leaderboard }) {
    const [leaderboardTable, setLeaderboardTable] = useState(leaderboard);

    useEffect(() => {
        leaderboard.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
        setLeaderboardTable(clone(leaderboard));
    }, [leaderboard])

    return (
        <div className={styles.tableDiv}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th>Username</th>
                        <th>Record time</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardTable.map((record, index) => {
                        return(
                            <tr key={record['username'] + index}>
                                <td>{record['username']}</td>
                                <td>{record['time']}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};