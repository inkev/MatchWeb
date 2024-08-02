import React from "react";
import { Link } from "react-router-dom";

const MatchList = ({ matchDetails }) => {
    const matchItems = [];

    for (let i = 0; i < matchDetails.length; i++) {
        const match = matchDetails[i];
        const { name } = match.metadata.map;
        matchItems.push(
             <li key = {i}>
                <Link to = {`match/${i}`}>Match on Map: {name}</Link>
             </li>
        )
    }
    return (
        <div>
            <h2>Match History</h2>
            <nav>
                {matchItems.length > 0 ? (
                    <ul>
                        {matchItems}
                    </ul>
                ) : (
                    <div>No matches found</div>
                )}
            </nav>
        </div>
    )
}

export default MatchList;