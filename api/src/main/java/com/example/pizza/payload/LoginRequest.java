package com.example.pizza.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела запроса при авторизации
 */
@Setter
@Getter
public class LoginRequest {
    private String usernameOrEmail;
    private String password;
}
