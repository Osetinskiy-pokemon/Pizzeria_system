package com.example.pizza.service;

import com.example.pizza.model.*;
import com.example.pizza.payload.EmployeeResponse;
import com.example.pizza.payload.OrderMenuResponse;
import com.example.pizza.payload.OrderRequest;
import com.example.pizza.payload.OrderResponse;
import com.example.pizza.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Сервис взаимодействия с заказами
 */
@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    Order_ItemsRepository order_itemsRepository;

    public void createOrder(OrderRequest orderRequest) {
        Client client = userRepository.getOne(orderRequest.getClientId());

        Order order = new Order(orderRequest.getOrderDate(), orderRequest.getAddress(), orderRequest.getPhone());

        client.addOrderItem(order);
        order.setClient(client);
        userRepository.save(client);

        List<Order_items> orderItems = new LinkedList<>();

        orderRequest.getOrderMenuRequestList().forEach(menuOrder -> {
            Menu curMenu = menuRepository.getOne(menuOrder.getId());
            Order_items order_item = new Order_items(curMenu, order, menuOrder.getQuantity(), menuOrder.getSubtotal());
            curMenu.addOrderItem(order_item);
            menuRepository.save(curMenu);
            orderItems.add(order_item);
        });

        order.setOrder_itemsSet(orderItems);

        orderRepository.save(order);
        order_itemsRepository.saveAll(orderItems);
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        List<OrderResponse> orderResponseList = new ArrayList<>();

        orders.forEach(order -> {
            Client client = order.getClient();

            List<OrderMenuResponse> orderMenuResponseList = new ArrayList<>();
            order.getOrder_itemsSet().forEach(item -> {
                OrderMenuResponse orderMenuResponse = new OrderMenuResponse(item.getMenu().getName(),
                        item.getQuantity(), item.getSubtotal());
                orderMenuResponseList.add(orderMenuResponse);
            });

            Employee employee = order.getEmployee();

            EmployeeResponse employeeResponse;
            if (employee != null) {
                employeeResponse = new EmployeeResponse(employee.getId(),
                        employee.getFirstName(),
                        employee.getLastName(),
                        employee.getTelephone(),
                        employee.getHireDate());
            } else {
                employeeResponse = new EmployeeResponse(null, null, null, null, null);
            }

            OrderResponse orderResponse = new OrderResponse(order.getId(),
                    order.getStatus(),
                    client.getFirstName(), client.getLastName(),
                    client.getPhone(), order.getAddress(),
                    order.getOrderDate(), employeeResponse, orderMenuResponseList);

            orderResponseList.add(orderResponse);
        });

        return orderResponseList;
    }

    public void deleteOrder(long orderId) {
        Order order = orderRepository.getOne(orderId);
        order.setStatus("deleted");
        orderRepository.save(order);
    }

    public void addEmployeeToOrder(long orderId, long employeeId) {
        Order order = orderRepository.getOne(orderId);
        Employee employee = employeeRepository.getOne(employeeId);

        employee.addOrder(order);
        order.setEmployee(employee);
        employeeRepository.save(employee);
        orderRepository.save(order);
    }

    public void updateStatusOrder(long orderId, String status) {
        Order order = orderRepository.getOne(orderId);

        order.setStatus(status);
        orderRepository.save(order);
    }
}
