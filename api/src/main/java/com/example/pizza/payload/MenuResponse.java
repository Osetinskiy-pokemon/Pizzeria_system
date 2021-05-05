package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Формат тела ответа сущности Меню
 */
@Setter
@Getter
@AllArgsConstructor
public class MenuResponse {
    private Long id;
    private String name;
    private Integer price;
    private Integer weight;
    private String image;
    private boolean status;
    private List<ProductResponse> productResponseList;
}
