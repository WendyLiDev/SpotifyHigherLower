const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend's origin
}));
app.use(express.json());

const getSpotifyToken = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const token = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify token:', error);
      throw error;
    }
};
  
app.get('/api/profile', async (req, res) => {
    try {
      const token = await getSpotifyToken();
      const response = await axios.get(`https://api.spotify.com/v1/artists/2EWXgN0xWOnbqJOxa9pWNO`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response: ", response);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching profile: ');
    }
});
  
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
