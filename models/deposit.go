package models

import "time"

type Deposit struct {
	UserID      string    `gorm:"not null" json:"user_id"`
	Name        string    `gorm:"not null" json:"name"`
	Amount      float64   `gorm:"not null" json:"amount"`
	Currency    string    `gorm:"not null" json:"currency"`
	TotalAmount float64   `gorm:"not null" json:"total_Amount"`
	CreateDate  time.Time `gorm:"autoCreateTime" json:"createdate"`
	UpdateAt    time.Time `gorm:"autoUpdateTime" json:"updateat"`
}
