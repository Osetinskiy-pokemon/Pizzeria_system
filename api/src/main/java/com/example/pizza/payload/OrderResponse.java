package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Формат тела ответа сущности заказ
 */
@Setter
@Getter
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private String status;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDateTime orderDate;
    private EmployeeResponse employee;
    private List<OrderMenuResponse> orderMenuResponseList;
}
