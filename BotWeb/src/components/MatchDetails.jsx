import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { MatchContext } from '../api/userApi';

const MatchDetails = () => {
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
        bluePlayers.push(
            {name: player.name, agent: player.agent, kills: player.kills, assists: player.assists, deaths: player.deaths}
        )   
    }

    for (let i = 0; i < ContMatch.matches[matchId].players_red.length; i++) {
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
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Agent</th>
                        <th>Kills</th>
                        <th>Assists</th>
                        <th>Deaths</th>
                    </tr>
                    {bluePlayers.map((val, key) => {
                        return (
                            <Link to = {`match/${matchId}/${val.name}`}>
                                <tr key = {key}>
                                        <td>{val.name}</td>
                                        <td>{val.agent}</td>
                                        <td>{val.kills}</td>
                                        <td>{val.assists}</td>
                                        <td>{val.deaths}</td>
                                </tr>
                            </Link>
                        )
                    })}
                    </tbody>
                </table>
            </nav>

            <nav>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Agent</th>
                        <th>Kills</th>
                        <th>Assists</th>
                        <th>Deaths</th>
                    </tr>
                    {redPlayers.map((val, key) => {
                        return (
                            <Link to = {`match/${matchId}/${val.name}`}>
                                <tr key = {key}>
                                        <td>{val.name}</td>
                                        <td>{val.agent}</td>
                                        <td>{val.kills}</td>
                                        <td>{val.assists}</td>
                                        <td>{val.deaths}</td>
                                </tr>
                            </Link>
                        )
                    })}
                    </tbody>
                </table>
            </nav>

        </div>
    )
}


export default MatchDetails;