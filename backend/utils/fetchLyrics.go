package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
)

const lyricsAPIURL = "https://api.lyrics.ovh/v1/%s/%s"

type LyricsResponse struct {
	Lyrics string `json:"lyrics"`
}

func FetchLyrics(artist, title string) (string, error) {
	url := fmt.Sprintf(lyricsAPIURL, artist, title)
	fmt.Println("Fetching lyrics from:", url)

	resp, err := http.Get(url)
	if err != nil {
		return "", errors.New("failed to call lyrics API")
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", errors.New("failed to read response")
	}

	var lyricsRes LyricsResponse
	err = json.Unmarshal(body, &lyricsRes)
	if err != nil || lyricsRes.Lyrics == "" {
		return "", errors.New("lyrics not found")
	}

	return lyricsRes.Lyrics, nil
}
