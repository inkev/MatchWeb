import React, { useContext, Image } from 'react'
import { Link } from "react-router-dom";
import { MatchContext } from '../api/userApi';

const PlayerDetails = () => {
    let bluePlayers = []
    let redPlayers = []
    let { matchId } = useParams();
    const ContMatch = useContext(MatchContext)
    const navStyle = {
        height: 100,
        width: 200,
    }

    for (let i = 0; i < ContMatch.matches[matchId].players_blue; i++) {
        let player = ContMatch.matches[matchId].players_blue[i];
        <tr>
            <td>{player.name}</td>
            <td>{player.agent}</td>
            <td>{player.kills}</td>
            <td>{player.assists}</td>
            <td>{player.deaths}</td>
        </tr>
    }

    for (let i = 0; i < ContMatch.matches[matchId].players_red; i++) {
        let player = ContMatch.matches[matchId].players_red[i];
        redPlayers.push(
            {name: player.name, agent: player.agent, kills: player.kills, assists: player.assists, deaths: player.deaths}
        )
    }
    
    return (
        <div>
            <h2>Players</h2>
            <nav>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Agent</th>
                        <th>Kills</th>
                        <th>Assists</th>
                        <th>Deaths</th>
                    </tr>
                    {bluePlayers}
                </table>
            </nav>

            <nav>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Agent</th>
                        <th>Kills</th>
                        <th>Assists</th>
                        <th>Deaths</th>
                    </tr>
                    {redPlayers.map((val, key) => {
                        return (
                            <tr key = {key}>
                                <td>{val.name}</td>
                                <td>{val.agent}</td>
                                <td>{val.kills}</td>
                                <td>{val.assists}</td>
                                <td>{val.deaths}</td>
                            </tr>
                        )
                    })}
                </table>
            </nav>

        </div>
    )
}

export default PlayerDetails;