package handlers

import (
	"errors"
	"finance/database"
	"finance/models"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v3"
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

func compareHashedPassword(data map[string]string, user models.User) error {
	if _, ok := data["password"]; !ok {
		return errors.New("password key not found in map")
	}

	err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"]))

	if err != nil {
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
