import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/profile`);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        Higher or Lower

        <button onClick={fetchProfile}>Fetch Profile</button>
        {profile && (
          <div>
            <h2>{profile.display_name}</h2>
            <img src={profile.images[0]?.url} alt="Profile" />
            <p>{profile.email}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
