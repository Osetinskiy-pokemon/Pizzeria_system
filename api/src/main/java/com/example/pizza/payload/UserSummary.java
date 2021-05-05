package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела ответа данных о пользователе
 */
@Setter
@Getter
@AllArgsConstructor
public class UserSummary {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;
}
