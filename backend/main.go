package main

import (
	"Celegram/db"
	"Celegram/handlers"
)

func main() {

	db.Init()
	defer db.Close()
	handlers.ServerStart()
}
