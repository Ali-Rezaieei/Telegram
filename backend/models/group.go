package models

type Group struct {
	ID               uint   `gorm:"primaryKey"`
	UserIDList       []uint `gorm:"type:integer[]"`
	GroupName        string
	GroupDescription string
	GroupPicture     string `gorm:"unique"`
}
