package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID        uint   `gorm:"primaryKey" json:"-"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Phone     string `gorm:"unique" json:"phone"`
	Username  string `gorm:"unique" json:"username"`
	Password  string `json:"-"`
	Image     string `gorm:"unique" json:"image"`
	Bio       string `json:"bio"`
}

// BeforeSave is a GORM hook that is called before saving a record.
func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	// Hash the password before saving
	cost := bcrypt.DefaultCost + 5 // 15
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), cost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}
