import axios from 'axios';

import {VALO_API_KEY} from '../../environment';

const API_BASE_URL = 'https://api.henrikdev.xyz';

export const fetchUserMatchHistoryByName = async (name, tag) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/valorant/v4/matches/na/pc/${name}/${tag}?api_key=${VALO_API_KEY}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data;
    } catch(error) {
    console.error('Error getting match history', error)
    throw error
    }
}