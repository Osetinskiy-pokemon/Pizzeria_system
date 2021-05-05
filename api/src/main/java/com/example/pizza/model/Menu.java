package com.example.pizza.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

/**
 * Таблица меню
 */
@Entity
@Table(name = "menu")
@Getter
@Setter
public class Menu {
    @OneToMany(mappedBy = "menu")
    List<Order_items> order_itemsSet = new LinkedList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer price;
    private Integer weight;
    private boolean status;
    private String image;
    @ManyToMany(fetch = LAZY)
    @JoinTable(
            name = "menu_product",
            joinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private Set<Product> productSet = new HashSet<>();

    public Menu() {
    }

    public Menu(String name, Integer price, Integer weight, boolean status, String image) {
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.status = status;
        this.image = image;
    }

    public void deleteProduct(Product product) {
        productSet.remove(product);
    }

    public void addProduct(List<Product> products) {
        productSet.addAll(products);
        products.forEach(product -> product.getMenuSet().add(this));
    }

    public void addOrderItem(Order_items orderItem) {
        this.order_itemsSet.add(orderItem);
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", weight=" + weight +
                ", status=" + status +
                '}';
    }
}
