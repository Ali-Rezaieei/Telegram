package handlers

import (
	"Celegram/db"
	"Celegram/middlewares"
	"Celegram/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Router                                   */
/* -------------------------------------------------------------------------- */
func GroupRouter(router *echo.Group) {

	group_router := router.Group("/groups")

	group_router.Use(middlewares.JWTMiddleware)

	group_router.POST("", createGroup)
	group_router.DELETE("/:group_id", deleteGroup)
	group_router.PATCH("/:group_id", addUserToGroup)
	group_router.DELETE("/:group_id/:user_id", deleteUserFromGroup)

}
func createGroup(c echo.Context) error {
	var group models.Group
	if err := c.Bind(&group); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}

	// Create the group
	if err := db.DB().Create(&group).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create group"})
	}

	return c.JSON(http.StatusCreated, group)
}

func deleteGroup(c echo.Context) error {
	groupID := getGroupIDFromParams(c)

	// Delete the group
	if err := db.DB().Delete(&models.Group{}, groupID).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete group"})
	}

	return c.NoContent(http.StatusNoContent)
}

func addUserToGroup(c echo.Context) error {
	groupID := getGroupIDFromParams(c)

	var userIDs []uint
	if err := c.Bind(&userIDs); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}

	// Add users to the group
	if err := db.DB().Model(&models.Group{}).Where("id = ?", groupID).Update("user_id_list", gorm.Expr("array_append(user_id_list, ?)", userIDs)).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to add users to group"})
	}

	return c.NoContent(http.StatusNoContent)
}

func deleteUserFromGroup(c echo.Context) error {
	groupID := getGroupIDFromParams(c)
	userID := getUserIDFromParams(c)

	// Remove user from the group
	if err := db.DB().Model(&models.Group{}).Where("id = ?", groupID).Update("user_id_list", gorm.Expr("array_remove(user_id_list, ?)", userID)).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to remove user from group"})
	}

	return c.NoContent(http.StatusNoContent)
}

/* -------------------------------------------------------------------------- */
/*                              Utility functions                             */
/* -------------------------------------------------------------------------- */
func getGroupIDFromParams(c echo.Context) uint {
	groupID, err := strconv.ParseUint(c.Param("group_id"), 10, 64)
	if err != nil {
		return 0
	}
	return uint(groupID)
}

func getUserIDFromParams(c echo.Context) uint {
	userID, err := strconv.ParseUint(c.Param("user_id"), 10, 64)
	if err != nil {
		return 0
	}
	return uint(userID)
}
