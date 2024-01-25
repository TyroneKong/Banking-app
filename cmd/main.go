package main

import (
	"finance/database"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"

	"finance/internal/handlers"
)

func main() {

	database.ConnectDB()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:5173",
		AllowMethods:     "GET, POST, PUT, DELETE, PATCH, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept",
	}))

	app.Get("/", func(c fiber.Ctx) error { return c.JSON("welcome to my server") })
	app.Post("/register", handlers.HandleRegister)
	app.Post("/login", handlers.HandleLogin)

	app.Listen(":3001")

}
