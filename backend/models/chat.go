package models

import "time"

type Chat struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserA     uint      `json:"user_a"`
	UserB     uint      `json:"user_b"`
	CreatedAt time.Time `json:"created_at"`

	// Foreign keys
	UserAInfo User `gorm:"foreignKey:UserA" json:"-"`
	UserBInfo User `gorm:"foreignKey:UserB" json:"-"`
}
