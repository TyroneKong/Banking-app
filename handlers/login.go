package handlers

import (
	"finance/database"
	"finance/models"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func HandleLogin(c fiber.Ctx) error {
	var data map[string]string

	if err := c.Bind().Body(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	log.Println("data:", data)

	if err := compareHashedPassword(data, user); err != nil {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"issuer":    strconv.Itoa(int(user.ID)),
		"expiresAt": time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(os.Getenv("API_SECRET")))

	if err != nil {
		return err
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Path:     "/",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 48),
		HTTPOnly: true,
	}

	log.Println("cookie", cookie)

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
