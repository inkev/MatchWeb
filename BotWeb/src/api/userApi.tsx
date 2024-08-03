import axios from 'axios';
import React, { createContext, useState } from 'react';

import {VALO_API_KEY} from '../../environment';

const API_BASE_URL = 'https://api.henrikdev.xyz';

type FetchUserMatchHistoryByName = (name:string, tag:string) => object

type details = {
    curmap: "Map",
};

type MatchDetails = {
    matches: details[] | undefined;
    fetchUserMatchHistoryByName: FetchUserMatchHistoryByName;
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
            setMatches(ParseData(response.data.data))
            console.log(matches)
        } catch(error) {
        console.error('Error getting match history', error)
        throw error
        }
    }

    return (
       <MatchContext.Provider value = {{ matches, fetchUserMatchHistoryByName}}>{children}</MatchContext.Provider>
    );
}

function ParseData (data:any[]) {
    let parsed = new Array<details>(data.length)
    for(let i = 0; i < data.length; i++) {
        const curr: details = {
            curmap: data[i].metadata.map.name
        }
        parsed[i] = curr
    }
    return parsed
}

export default MatchProvider
