import React, { useState } from 'react';
import { fetchUserMatchHistoryByName } from '../api/userApi';

const Matches = () => {
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [matchDetails, setMatchDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setMatchDetails([]);

        try {
            const data = await fetchUserMatchHistoryByName(name, tag);
            setMatchDetails(data);
            console.log(matchDetails)
        } catch(error) {
            console.error('Error fetching match details', error);
            setError('Failed to fetch match details')
        } finally {
            setLoading(false);
        }
    };

return (
    <div>
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
      {matchDetails.length > 0 && (
        <div>
        <h2>Match Details</h2>
        <pre>{JSON.stringify(matchDetails, null, 2)}</pre>
        </div>
      )};
    </div>
  );
};

export default Matches;