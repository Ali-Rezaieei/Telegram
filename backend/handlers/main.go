package handlers

import (
	"fmt"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var upgrader2 = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ServerStart() {
	r := echo.New()

	// Add CORS middleware to allow requests from all origins
	r.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAuthorization, // Include Authorization header
		},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE}, // Adjust allowed methods as needed
	}))

	router := r.Group("/api/v1")

	AuthRouter(router)
	UserRouter(router)
	ContactsRouter(router)
	ChatsRouter(router)
	GroupRouter(router)

	r.GET("/ws", func(c echo.Context) error {
		ws, err := upgrader2.Upgrade(c.Response(), c.Request(), nil)
		if err != nil {
			return err
		}
		defer ws.Close()

		// Handle the WebSocket connection here
		for {
			// Read message from the client
			messageType, p, err := ws.ReadMessage()
			if err != nil {
				return err
			}

			// Print the received message
			fmt.Printf("Received message: %s\n", string(p))

			// Write message back to the client
			err = ws.WriteMessage(messageType, p)
			if err != nil {
				return err
			}
		}

	})

	// router.Run("localhost:8080")
	r.Start("0.0.0.0:1323")
}
