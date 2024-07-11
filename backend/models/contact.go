package models

type Contact struct {
	UserID      uint   `gorm:"primaryKey" json:"-"`
	ContactID   uint   `gorm:"primaryKey" json:"contact_id"`
	ContactName string `json:"contact_name"`

	// Foreign keys
	User    User `gorm:"foreignKey:UserID" json:"-"`
	Contact User `gorm:"foreignKey:ContactID" json:"-"`
}
