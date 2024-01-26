package models

import "time"

type Withdraw struct {
	UserID      string    `gorm:"not null" json:"user_id"`
	Name        string    `gorm:"not null" json:"name"`
	Amount      float64   `gorm:"not null" json:"withdrawl_amount"`
	Currency    string    `gorm:"not null" json:"currency"`
	TotalAmount float64   `gorm:"not null" json:"total_amount"`
	CreateDate  time.Time `gorm:"autoCreateTime" json:"createdate"`
	UpdateAt    time.Time `gorm:"autoUpdateTime" json:"updateat"`
}
