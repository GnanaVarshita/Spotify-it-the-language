package utils

import (
	"context"
	"errors"
	"fmt"
	"log"

	"google.golang.org/genai"
)

const geminiAPIKey = "Your Gemini API key"

func GeminiTranslate(text string) (string, error) {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  geminiAPIKey,
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		log.Fatal(err)
		return "", errors.New("failed to initialize Gemini API client")
	}

	result, err := client.Models.GenerateContent(
		ctx,
		"gemini-2.0-flash",
		genai.Text(fmt.Sprintf("Translate the following text to English: %s", text)),
		nil,
	)
	if err != nil {
		log.Fatal(err)
		return "", errors.New("translation failed")
	}

	return result.Text(), nil
}
