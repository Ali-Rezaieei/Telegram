package handlers

import (
	"Celegram/configs"
	"Celegram/db"
	"Celegram/middlewares"
	"Celegram/models"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func AuthRouter(router *echo.Group) {

	router.POST("/login", login)
	router.POST("/register", register)

}

func register(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")
	firstname := c.FormValue("firstname")
	lastname := c.FormValue("lastname")
	phone := c.FormValue("phonenumber")
	imageFile, err := c.FormFile("image")
	bio := c.FormValue("bio")

	if len(username) == 0 || len(password) == 0 || len(firstname) == 0 || len(lastname) == 0 || len(phone) == 0 {
		return c.String(http.StatusBadRequest, "Fill all values")
	}

	if err != nil {
		fmt.Println(err.Error())
		return c.String(http.StatusBadRequest, "Something wrong with the file")
	}

	// Get the file extension
	extension := filepath.Ext(imageFile.Filename)
	validExtensions := map[string]bool{".jpg": true, ".jpeg": true, ".png": true}

	// Check if the file extension is valid
	if !validExtensions[extension] {
		return c.String(http.StatusBadRequest, "Invalid file type. Supported types are jpg, jpeg, png")
	}

	// Generate a unique filename with the original file extension
	filename := uuid.New().String() + extension

	// Source
	src, err := imageFile.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Destination
	dst, err := os.Create("../frontend/public/" + filename)
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	err = db.RegisterUser(&models.User{
		Username:  username,
		Password:  password,
		FirstName: firstname,
		LastName:  lastname,
		Phone:     phone,
		Bio:       bio,
		Image:     filename,
	})
	if err != nil {
		fmt.Println(err.Error())
		return c.String(http.StatusConflict, "User already exists")
	}
	return c.String(http.StatusOK, "User "+username+" created")
}

func login(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")
	user := new(models.User)
	// Throws unauthorized error
	valid, err := db.ValidateUser(username, password, user)
	if !valid && err != nil {
		return c.String(http.StatusUnauthorized, "NotFound")
	}
	if !valid && err == nil {
		return c.String(http.StatusUnauthorized, "Wrong Password")
	}

	// Set custom claims
	claims := &middlewares.JwtCustomClaim{
		UserId: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString(configs.JWT_SECRET)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": t,
	})
}
