package handlers

import (
	"Celegram/db"
	"Celegram/middlewares"
	"Celegram/models"
	"errors"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */

func getUserIDFromContext(c echo.Context) (uint, error) {
	user := c.Get("user").(*jwt.Token)

	claims := user.Claims.(*middlewares.JwtCustomClaim)
	uid := claims.UserId

	if user.Valid {
		return uid, nil
	}
	return 0, errors.New("user not valid")
}

/* -------------------------------------------------------------------------- */
/*                                 Main Router                                */
/* -------------------------------------------------------------------------- */

func UserRouter(router *echo.Group) {

	users_group := router.Group("/users")

	users_group.Use(middlewares.JWTMiddleware)

	users_group.GET("/checktoken", checkToken)
	users_group.GET("/", getUser)
	users_group.PATCH("/", updateUser)
	users_group.DELETE("/", deleteUser)
	users_group.GET("/search", searchUsers)
}

/* -------------------------------------------------------------------------- */
/*                                   Routers                                  */
/* -------------------------------------------------------------------------- */

func getUser(c echo.Context) error {
	userID, err := getUserIDFromContext(c)
	if err != nil {
		return c.NoContent(http.StatusUnauthorized)
	}
	user := models.User{
		ID: userID,
	}

	if err := db.DB().First(&user, userID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}

	return c.JSON(http.StatusOK, user)
}

func updateUser(c echo.Context) error {
	// Get user ID from context
	userID, err := getUserIDFromContext(c)
	if err != nil {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Find the user by ID
	var user models.User
	if err := db.DB().First(&user, userID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}

	// Create a struct to hold only the fields allowed to be updated
	updateData := struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Bio       string `json:"bio"`
	}{}

	// Bind request body to the updateData struct
	if err := c.Bind(&updateData); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}

	// Update only the allowed fields
	user.FirstName = updateData.FirstName
	user.LastName = updateData.LastName
	user.Bio = updateData.Bio

	// Save the updated user
	db.DB().Save(&user)

	return c.JSON(http.StatusOK, user)
}

func deleteUser(c echo.Context) error {
	userID, err := getUserIDFromContext(c)
	if err != nil {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Delete the user
	if err := db.DB().Delete(&models.User{}, userID).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete user"})
	}

	return c.NoContent(http.StatusNoContent)
}

func searchUsers(c echo.Context) error {
	keyword := c.QueryParam("username")

	var users []models.User
	if err := db.DB().Where("username LIKE ?", "%"+keyword+"%").Find(&users).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to search users"})
	}

	return c.JSON(http.StatusOK, users)
}
func checkToken(c echo.Context) error {
	_, err := getUserIDFromContext(c)
	if err != nil {
		return c.NoContent(http.StatusUnauthorized)
	}

	return c.String(http.StatusOK, "")
}
