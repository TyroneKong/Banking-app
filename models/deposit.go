package models

import "time"

type Deposit struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	UserID      string    `gorm:"not null" json:"user_id"`
	Name        string    `gorm:"not null" json:"name"`
	Amount      float64   `gorm:"not null" json:"deposit_amount"`
	Currency    string    `gorm:"not null" json:"currency"`
	TotalAmount float64   `gorm:"not null" json:"total_Amount"`
	Withdrawal  float64   `gorm:"not null" json:"withdrawl_amount"`
	CreateDate  time.Time `gorm:"autoCreateTime" json:"createdate"`
	UpdateAt    time.Time `gorm:"autoUpdateTime" json:"updateat"`
}
