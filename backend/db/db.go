package db

import (
	"Celegram/models"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	glogger "gorm.io/gorm/logger"
)

// var dsn string = "host=db-midterm-shoplist.a.aivencloud.com user=avnadmin password=AVNS_nAGWLmU-OHGpERAxMBj dbname=defaultdb port=20999 sslmode=require"
var dsn string = "host=localhost user=postgres password=123456 dbname=CelegramDB port=5432 sslmode=disable"
var db *gorm.DB
var db_err error

func Init() {
	db, db_err = gorm.Open(postgres.Open(dsn), &gorm.Config{

		Logger: glogger.Default.LogMode(glogger.Silent),
	})
	if db_err != nil {
		panic("failed to connect database")
	}
	fmt.Println("DB Connected Succesfuly")
	err := db.AutoMigrate(&models.User{}, &models.Contact{}, &models.Group{}, &models.Channel{}, &models.Chat{}, &models.Message{})

	if err != nil {
		fmt.Println("Basket Migration Failed")
		panic(err.Error())
	}

	_ = db.Exec("ALTER TABLE chats ADD CONSTRAINT unique_user_combination UNIQUE (user_a, user_b)")

}
func Close() {
	dbInstance, _ := db.DB()
	dbInstance.Close()
}

func DB() *gorm.DB {
	return db
}
