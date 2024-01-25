package handlers

import (
	"errors"
	"finance/database"
	"finance/models"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(data map[string]string, cost int) ([]byte, error) {
	if _, ok := data["password"]; !ok {
		return nil, errors.New("password key not found in map")
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(data["password"]), cost)
	if err != nil {
		log.Println("Error", err)
	}

	return hashedPassword, nil
}

// when they log in
func compareHashedPassword(data map[string]string, user models.User) error {
	if _, ok := data["password"]; !ok {
		return errors.New("password key not found in map")
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		return fmt.Errorf("Passwords do not match")
	}

	return nil
}

func HandleRegister(c fiber.Ctx) error {
	var data map[string]string

	if err := c.Bind().Body(&data); err != nil {
		return err
	}

	password, _ := hashPassword(data, 14)

	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Username: data["username"],
		Password: password,
	}
	database.DB.Create(&user)
	return c.JSON(user)
}

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
