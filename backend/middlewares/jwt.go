package middlewares

import (
	"Celegram/configs"


	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/golang-jwt/jwt/v5"

)

type JwtCustomClaim struct {
	UserId uint `json:"uid"`
	jwt.RegisteredClaims
}

var JWTconfig = echojwt.Config{
	NewClaimsFunc: func(c echo.Context) jwt.Claims {
		return new(JwtCustomClaim)
	},
	SigningKey: configs.JWT_SECRET,
}

var JWTMiddleware = echojwt.WithConfig(JWTconfig)