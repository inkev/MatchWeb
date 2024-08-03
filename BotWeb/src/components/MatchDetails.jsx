import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { MatchContext } from '../api/userApi';

const MatchDetails = ({ match }) => {
    
    const ContMatch = useContext(MatchContext);
    let { matchId } = useParams();
    const currentMatch = ContMatch.matches[matchId]

    return (
        <div>
            <h2>Match Details</h2>
            <h3>{currentMatch.curmap}</h3>
            <pre>{JSON.stringify(match, null, 2)}</pre>
        </div>
    )
}


export default MatchDetails;