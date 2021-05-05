package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Формат тела запроса сущности Меню
 */
@Setter
@Getter
@AllArgsConstructor
public class MenuRequest {
    private String name;
    private Integer price;
    private Integer weight;
    private boolean status;
    private List<Long> productList;
}
