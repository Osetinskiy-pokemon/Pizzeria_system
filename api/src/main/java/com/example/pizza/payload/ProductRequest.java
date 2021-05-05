package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела запроса сущности товар
 */
@Setter
@Getter
@AllArgsConstructor
public class ProductRequest {
    String name;
}
