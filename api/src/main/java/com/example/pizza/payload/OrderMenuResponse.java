package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела ответа сущности заказа товара
 */
@Getter
@Setter
@AllArgsConstructor
public class OrderMenuResponse {
    private String name;
    private Integer quantity;
    private Integer subtotal;
}
