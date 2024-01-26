package main

import (
	"finance/database"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"

	"finance/internal/handlers"
)

func setupRoutes(app *fiber.App) {

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET, POST, PUT, DELETE, PATCH, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept",
	}))

	app.Post("/api/register", handlers.HandleRegister)
	app.Post("/api/login", handlers.HandleLogin)
	app.Get("/api/user/:id", handlers.HandleGetUser)
	app.Get("/api/currentUser", handlers.HandleGetCurrentUser)
	app.Post("/api/createTransaction", handlers.HandleCreateTransaction)
	app.Post("/api/createExpense", handlers.HandleCreateExpense)
	app.Get("/api/allTransactions", handlers.HandleGetAllTransactions)
	app.Get("/api/allExpenses", handlers.HandleGetAllExpenses)
	app.Listen(":3001")

}

func main() {

	database.ConnectDB()

	app := fiber.New()
	// protected := app.Group("/protected", middleware.CheckAuth)

	setupRoutes(app)

}
