package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Формат тела запроса сущности заказа
 */
@Getter
@Setter
@AllArgsConstructor
public class OrderRequest {
    private Long clientId;
    private String phone;
    private String address;
    private LocalDateTime orderDate;
    private List<OrderMenuRequest> orderMenuRequestList;
}
