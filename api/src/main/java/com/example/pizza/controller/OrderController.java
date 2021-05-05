package com.example.pizza.controller;

import com.example.pizza.payload.ApiResponse;
import com.example.pizza.payload.OrderRequest;
import com.example.pizza.payload.OrderResponse;
import com.example.pizza.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;

/**
 * Контроллер заказов
 */
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    /**
     * Создание заказа
     * @param orderRequest обработчик запроса с телом запроса с полями класса OrderRequest
     * @return ответ сервера со статусо и телом ответа
     */
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            orderService.createOrder(orderRequest);
            return new ResponseEntity<>(new ApiResponse(true, "Order created"), CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), CONFLICT);
        }
    }

    /**
     * Возвразает список заказав
     * @return список заказов
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    /**
     * Добавляет к заказу курьера
     * @param orderId идентификатор заказа
     * @param employeeId идентификатор курьера
     * @return
     */
    @PutMapping("/{orderId}/{employeeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse addEmployeeToOrder(@PathVariable long orderId, @PathVariable long employeeId) {
        try {
            orderService.addEmployeeToOrder(orderId, employeeId);
            return new ApiResponse(true, "Курьер добавлен к заказу");
        } catch (Exception e) {
            return new ApiResponse(false, "Курьер не был добавлен");
        }
    }

    /**
     * Обновляет статус заказа
     * @param id идентификатор заказа
     * @param status статус заказа
     * @return
     */
    @PutMapping("/status/{id}/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse updateOrderStatus(@PathVariable long id, @PathVariable String status) {
        try {
            orderService.updateStatusOrder(id, status);
            return new ApiResponse(true, "Заказ обновлен");
        } catch (Exception e) {
            return new ApiResponse(false, "Заказ не обновлен");
        }
    }

    /**
     * Удаляет закал (soft-delete)
     * @param orderId идентификатор заказа
     * @return
     */
    @DeleteMapping("/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse deleteOrder(@PathVariable long orderId) {
        try {
            orderService.deleteOrder(orderId);
            return new ApiResponse(true, "Заказ удален");
        } catch (Exception e) {
            return new ApiResponse(false, "Заказ не удален");
        }
    }
}
