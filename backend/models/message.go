package models

import "time"

type Message struct {
	ID                uint
	ChatID            uint
	Sender            uint
	Content           string
	CreatedAt         time.Time
	ReceiverGroupID   uint
	ReceiverUserID    uint
	ReceiverChannelID uint
}
