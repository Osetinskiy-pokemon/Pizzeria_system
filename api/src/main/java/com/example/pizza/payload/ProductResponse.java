package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела ответа сущности товар
 */
@Setter
@Getter
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
}
