package com.example.pizza.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела запроса на регистрацию
 */
@Setter
@Getter
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String address;
    private String password;
    private String phone;
}
