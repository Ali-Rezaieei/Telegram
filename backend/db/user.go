package db

import (
	"Celegram/models"

	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(u *models.User) error {
	result := db.Create(u)
	return result.Error
}
func ValidateUser(username, password string, user *models.User) (bool, error) {
	// Retrieve the user by username
	result := db.Where("username = ?", username).First(user)
	if result.Error != nil {
		// Handle error (user not found or other issues)
		return false, result.Error
	}

	// Compare the hashed password with the input password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		// Passwords do not match
		return false, nil
	}

	// Valid username and password
	return true, nil
}
