package models

type Channel struct {
	ID                 uint   `gorm:"primaryKey"`
	UserIDList         []uint `gorm:"type:integer[]"`
	ChannelName        string
	ChannelDescription string
	ChannelPicture     string `gorm:"unique"`
}
