package com.example.pizza.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

/**
 * Таблица заказов
 */
@Entity
@Table(name = "orders")
@Setter
@Getter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    private LocalDateTime orderDate;

    private String phone;

    private String address;

    public Order(){};

    public Order(LocalDateTime orderDate, String address, String phone) {
        this.orderDate = orderDate;
        this.phone = phone;
        this.address = address;
        this.status = "заказан";
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "order")
    List<Order_items> order_itemsSet = new LinkedList<>();

    public void addOrderItem(Order_items orderItem) {
        this.order_itemsSet.add(orderItem);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                '}';
    }
}
