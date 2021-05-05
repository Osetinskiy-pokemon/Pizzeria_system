package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела ответа
 */
@Setter
@Getter
@AllArgsConstructor
public class ApiResponse {
    private Boolean success;
    private String message;
}
