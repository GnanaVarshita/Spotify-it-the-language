package handlers

import (
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func TranslateLyrics(c *gin.Context) {
	text := c.Query("text")

	translatedText, err := utils.GeminiTranslate(text)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Translation failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"translatedLyrics": translatedText})
}
