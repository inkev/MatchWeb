import axios from 'axios';
import React, { createContext, useState } from 'react';

import {VALO_API_KEY} from '../../environment';

import ascentPng from '../assets/maps/ascent.png';
import abyssPng from '../assets/maps/abyss.png';
import bindPng from '../assets/maps/bind.png';
import breezePng from '../assets/maps/breeze.png';
import fracturePng from '../assets/maps/fracture.png';
import havenPng from '../assets/maps/haven.png';
import iceboxPng from '../assets/maps/icebox.png';
import lotusPng from '../assets/maps/lotus.png';
import pearlPng from '../assets/maps/pearl.png';
import splitPng from '../assets/maps/split.png';
import sunsetPng from '../assets/maps/sunset.png';

const API_BASE_URL = 'https://api.henrikdev.xyz';

type FetchUserMatchHistoryByName = (name:string, tag:string) => object

type details = {
    curmap: string,
    team_id: string,
    score: score,
    players_blue: playerData[],
    players_red: playerData[]
};

type score = {
    Lost: number,
    Won: number
}
type playerData = {
    party_id: string,
    name: string,
    agent: string,
    kills: number,
    deaths: number,
    assists: number,
}

type MatchDetails = {
    matches: details[] | undefined;
    fetchUserMatchHistoryByName: FetchUserMatchHistoryByName;
    mapImages: {[id: string] : any};
}

type MatchProviderProps = {children:React.ReactNode}

export const MatchContext = createContext<MatchDetails | undefined>(undefined)

const MatchProvider: React.FC<MatchProviderProps> = ({ children }) : React.ReactElement => {
    const [matches, setMatches] = useState<details[] | undefined>(undefined);
    async function fetchUserMatchHistoryByName(name:string, tag:string){
        try {
            const response = await axios.get(`${API_BASE_URL}/valorant/v4/matches/na/pc/${name}/${tag}?api_key=${VALO_API_KEY}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            setMatches(ParseData(response.data.data, name));
            console.log(matches);
        } catch(error) {
        console.error('Error getting match history', error)
        throw error
        }
    }
    const mapImages = {
        "Ascent": ascentPng,
        "Abyss": abyssPng,
        "Bind": bindPng,
        "Breeze": breezePng,
        "Fracture": fracturePng,
        "Haven": havenPng,
        "Icebox": iceboxPng,
        "Lotus": lotusPng,
        "Pearl": pearlPng,
        "Split": splitPng,
        "Sunset": sunsetPng
    }
    return (
       <MatchContext.Provider value = {{ matches, fetchUserMatchHistoryByName, mapImages}}>{children}</MatchContext.Provider>
    );
}

function ParseData (data:any[], name: string) {
    let parsed = new Array<details>(data.length)
    for(let i = 0; i < data.length; i++) { 
        let curr_team_id = getTeamId(data[i], name)
        const curr: details = {
            curmap: data[i].metadata.map.name,
            team_id: curr_team_id,
            score: getTeamScore(data[i], curr_team_id),
            players_blue: getPlayersByTeam(data[i], "Blue"),
            players_red: getPlayersByTeam(data[i], "Red")
        }
        parsed[i] = curr;
    }
    return parsed
}

function getTeamId (data:any, name:string) {
    for(let i = 0; i < data.players.length; i++) {
        if(name == data.players[i].name) {
            return data.players[i].team_id
        }
    }
    return "";
}

function getTeamScore (data:any, team_id: string) {
    return team_id == "Red" ? data.teams[0].rounds : data.teams[1].rounds
}

function getPlayersByTeam (data:any, team:string) {
    let playerData = new Array<playerData>
    for(let i = 0; i < data.players.length; i++) {
        if(data.players[i].team_id == team) {
            playerData.push(getPlayerData(data.players[i]))
        }
    }
    return playerData
}

function getPlayerData(player: any) {
    let currPlayer : playerData = {
        party_id: player.party_id,
        name: player.name,
        agent: player.agent.name,
        kills: player.stats.kills,
        deaths: player.stats.deaths,
        assists: player.stats.assists
    }
    return currPlayer
}

export default MatchProvider
