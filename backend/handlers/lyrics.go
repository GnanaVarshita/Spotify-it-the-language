package handlers

import (
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetLyrics(c *gin.Context) {
	song := c.Query("song")
	artist := c.Query("artist")

	if artist == "" || song == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing artist or song title"})
		return
	}

	lyrics, err := utils.FetchLyrics(artist, song)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Lyrics not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"lyrics": lyrics})
}
