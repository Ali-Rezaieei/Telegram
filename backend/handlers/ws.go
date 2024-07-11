package handlers

import (
	"net/http"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)



var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/ws", wsHandler)

	// Start the server
	e.Start(":8080")
}

func wsHandler(c echo.Context) error {
	userID, err := getUserIDFromContext(c)
	userID += 1
	
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer conn.Close()

	// Your WebSocket logic goes here
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			break
		}

		// Handle your WebSocket messages
		_ = messageType
		_ = p
	}

	return nil
}


