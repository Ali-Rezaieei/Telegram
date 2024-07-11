package handlers

import (
	"Celegram/db"
	"Celegram/middlewares"
	"Celegram/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */
func getContactIDFromParams(c echo.Context) uint {
	contactID, err := strconv.ParseUint(c.Param("contact_id"), 10, 64)
	if err != nil {
		return 0
	}
	return uint(contactID)
}

/* -------------------------------------------------------------------------- */
/*                                   Router                                   */
/* -------------------------------------------------------------------------- */
func ContactsRouter(router *echo.Group) {

	contacts_group := router.Group("/users/contacts/")

	contacts_group.Use(middlewares.JWTMiddleware)

	contacts_group.GET("", getUserContacts)
	contacts_group.POST("", addContact)
	contacts_group.DELETE(":contact_id", deleteContact)

}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */
func getUserContacts(c echo.Context) error {
	userID, err := getUserIDFromContext(c)
	if err != nil {
		return c.NoContent(http.StatusUnauthorized)
	}

	var contacts []models.Contact
	if err := db.DB().Where("user_id = ?", userID).Find(&contacts).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to get user contacts"})
	}

	return c.JSON(http.StatusOK, contacts)
}

func addContact(c echo.Context) error {
	userID, err := getUserIDFromContext(c)
	if err != nil {
		return c.NoContent(http.StatusUnauthorized)
	}

	var contact models.Contact
	if err := c.Bind(&contact); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	contact.UserID = userID

	// Check if the contact exists
	var existingContact models.Contact
	if err := db.DB().Where("user_id = ? AND contact_id = ?", userID, contact.ContactID).First(&existingContact).Error; err == nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Contact already exists"})
	}

	// Create the contact
	if err := db.DB().Create(&contact).Error; err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to add contact"})
	}

	return c.JSON(http.StatusCreated, contact)
}

func deleteContact(c echo.Context) error {
	userID, err := getUserIDFromContext(c)
	if err != nil {
		return c.NoContent(http.StatusUnauthorized)
	}
	contactID := getContactIDFromParams(c)

	// Delete the contact
	if err := db.DB().Where("user_id = ? AND contact_id = ?", userID, contactID).Delete(&models.Contact{}).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete contact"})
	}

	return c.NoContent(http.StatusOK)
}
