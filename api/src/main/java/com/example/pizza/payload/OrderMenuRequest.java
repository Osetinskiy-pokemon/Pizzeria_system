package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Формат тела запроса сущности заказа товара
 */
@Getter
@Setter
@AllArgsConstructor
public class OrderMenuRequest {
    private Long id;
    private Integer quantity;
    private Integer subtotal;
}
