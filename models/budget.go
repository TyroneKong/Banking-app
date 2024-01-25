package models

import "time"

type Budget struct {
	ID         string    `gorm:"primaryKey" json:"id"`
	UserID     string    `gorm:"not null" json:"userid"`
	Name       string    `gorm:"not null" json:"name"`
	Amount     float64   `gorm:"not null" json:"amount"`
	Currency   string    `gorm:"not null" json:"currency"`
	StartDate  time.Time `gorm:"not null" json:"startdate"`
	EndDate    time.Time `gorm:"not null" json:"enddate"`
	CreateDate time.Time `gorm:"primaryKey" json:"createdate"`
	UpdateAt   time.Time `gorm:"primaryKey" json:"updateat"`
}

func NewBudget(userId string, name string, amount float64, currency string, startDate, endDate time.Time) *Budget {
	return &Budget{
		UserID:    userId,
		Name:      name,
		Amount:    amount,
		Currency:  currency,
		StartDate: startDate,
		EndDate:   endDate,
	}
}
