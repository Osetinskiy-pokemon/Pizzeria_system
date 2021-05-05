package com.example.pizza.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.EAGER;

/**
 * Соединительая таблица заказов и меню
 */
@Entity
@Table(name = "order_items")
@Getter
@Setter
public class Order_items {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private int subtotal;

    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "order_id")
    private Order order;

    public Order_items() {};

    public Order_items(Menu menu, Order order, int quantity, int subtotal) {
        this.menu = menu;
        this.order = order;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    @Override
    public String toString() {
        return "Order_items{" +
                "id=" + id +
                '}';
    }
}
