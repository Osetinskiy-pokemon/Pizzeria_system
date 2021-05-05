package com.example.pizza.repository;

import com.example.pizza.model.Order_items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Order_ItemsRepository extends JpaRepository<Order_items, Long> {

}
