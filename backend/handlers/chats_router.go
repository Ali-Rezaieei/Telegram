package handlers

import (
	"Celegram/db"
	"Celegram/middlewares"
	"Celegram/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func ChatsRouter(router *echo.Group) {

	chats_group := router.Group("/chats")

	chats_group.Use(middlewares.JWTMiddleware)

	chats_group.POST("/:chat_id", createChat)
	chats_group.GET("", getChats)
	chats_group.GET("/:chat_id", getChat)
	chats_group.DELETE("/:chat_id", deleteChat)
	chats_group.DELETE("/:chat_id/messages/:message_id", deleteMessage)
}

// Define handlers here

func createChat(c echo.Context) error {
	userId, _ := getUserIDFromContext(c)
	chatId := getChatIDFromParams(c)

	var chat models.Chat

	chat.UserA = min(userId, chatId)
	chat.UserB = max(userId, chatId)

	// Create the chat
	if err := db.DB().Create(&chat).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create chat"})
	}

	return c.JSON(http.StatusCreated, chat)
}

func getChats(c echo.Context) error {
	var chats []models.Chat
	if err := db.DB().Find(&chats).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to get chats"})
	}

	return c.JSON(http.StatusOK, chats)
}

func getChat(c echo.Context) error {
	chatID := getChatIDFromParams(c)
	var chat models.Chat

	if err := db.DB().First(&chat, chatID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Chat not found"})
	}

	return c.JSON(http.StatusOK, chat)
}

func deleteChat(c echo.Context) error {
	chatID := getChatIDFromParams(c)

	// Delete the chat
	if err := db.DB().Delete(&models.Chat{}, chatID).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete chat"})
	}

	return c.NoContent(http.StatusNoContent)
}

func deleteMessage(c echo.Context) error {
	chatID := getChatIDFromParams(c)
	messageID := getMessageIDFromParams(c)

	// Delete the message
	if err := db.DB().Where("chat_id = ? AND id = ?", chatID, messageID).Delete(&models.Message{}).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete message"})
	}

	return c.NoContent(http.StatusNoContent)
}

// Utility functions
func getChatIDFromParams(c echo.Context) uint {
	chatID, err := strconv.ParseUint(c.Param("chat_id"), 10, 64)
	if err != nil {
		return 0
	}
	return uint(chatID)
}

func getMessageIDFromParams(c echo.Context) uint {
	messageID, err := strconv.ParseUint(c.Param("message_id"), 10, 64)
	if err != nil {
		return 0
	}
	return uint(messageID)
}
