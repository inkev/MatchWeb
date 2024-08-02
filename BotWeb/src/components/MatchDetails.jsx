import Reacth from 'react'
import { json } from 'react-router-dom'

const MatchDetails = ({match}) => {
    return (
        <div>
            <h2>Match Details</h2>
            <pre>{JSON.stringify(match, null, 2)}</pre>
        </div>
    )
}


export default MatchDetails;