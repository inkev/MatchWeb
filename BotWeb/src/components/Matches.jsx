import React, { useContext, useState } from 'react';
import MatchList from './MatchList'

import { MatchContext } from '../api/userApi';

const Matches = () => {
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [matchDetails, setMatchDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMatch, setSelectedMatch] = useState(null)
    const ContMatch = useContext(MatchContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setMatchDetails([]);

        try {
            ContMatch.fetchUserMatchHistoryByName(name, tag)
        } catch(error) {
            console.error('Error fetching match details', error);
            setError('Failed to fetch match details')
        } finally {
            setLoading(false);
        }
    };

    const handleMatchClick = (match) => {
      setSelectedMatch(match)
    }

return (
  <div style={{ display: 'flex' }}>
  <div style={{ width: '300px', padding: '20px' }}>
      <h1>Fetch Match History</h1>
      <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="name">Name:</label>
              <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
              />
          </div>
          <div>
              <label htmlFor="tag">Tag:</label>
              <input
                  id="tag"
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Enter tag"
                  required
              />
          </div>
          <button type="submit">Fetch Matches</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {/* Render MatchList */}
        {ContMatch.matches != null && ContMatch.matches.length > 0 && (
            <MatchList onMatchClick={handleMatchClick} />
        )}
      </ul>
  </div>

  <div style={{ flexGrow: 1, padding: '20px' }}>
      {/* Render MatchDetails if a match is selected */}
      {selectedMatch ? (
          <MatchDetails match={selectedMatch} />
      ) : (
          <div>Select a match to view details</div>
      )}
  </div>
</div>
  );
};

export default Matches;