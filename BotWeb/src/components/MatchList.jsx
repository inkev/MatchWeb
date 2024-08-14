import React, { useContext, Image } from 'react'
import { Link } from "react-router-dom";
import { MatchContext } from '../api/userApi';

const MatchList = () => {
    let matchItems = []
    const ContMatch = useContext(MatchContext)
    const navStyle = {
        height: 100,
        width: 200,
    }

    for (let i = 0; i < ContMatch.matches.length; i++) {
        const background = ContMatch.mapImages[ContMatch.matches[i].curmap];
        matchItems.push(
            <li key = {i}>
                <Link to = {`match/${i}`}>
                        <h2></h2>
                        <img src = {background} style = {navStyle}/>
                </Link>
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