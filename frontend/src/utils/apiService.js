import axios from "axios";

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search";

/**
 * Fetches Spotify access token using Client Credentials Flow
 */
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      SPOTIFY_AUTH_URL,
      `grant_type=client_credentials&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&client_secret=${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }
};

/**
 * Searches for songs using Spotify API
 */
export const searchSongs = async (query) => {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error("Failed to fetch Spotify token");

    const response = await axios.get(`${SPOTIFY_SEARCH_URL}?q=${query}&type=track`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.tracks.items;
  } catch (error) {
    console.error("Error searching for songs:", error);
    return [];
  }
};