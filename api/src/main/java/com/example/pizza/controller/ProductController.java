package com.example.pizza.controller;

import com.example.pizza.model.Product;
import com.example.pizza.payload.ApiResponse;
import com.example.pizza.payload.ProductRequest;
import com.example.pizza.payload.ProductResponse;
import com.example.pizza.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static org.springframework.http.HttpStatus.*;

/**
 * Контроллер продуктов
 */
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    /**
     * Обработчик запроса на создание продукта
     * @param productRequest
     * @return
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest productRequest) {
        try {
            productService.createProduct(new Product(productRequest.getName()));
            return new ResponseEntity<>(new ApiResponse(true, "Product created"), CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Product did not create"), INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Обработчик получения всех продуктов
     * @return
     */
    @GetMapping("/all")
    public List<ProductResponse> getProducts() {
        return productService.getAllProducts();
    }

    /**
     * Обновление информации продукта
     * @param id
     * @param name
     * @return
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProduct(@PathVariable long id, @RequestBody String name) {
        return new ResponseEntity<>(productService.updateProduct(name, id), OK);
    }

    /**
     * Удаление продукта (hard-delete)
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable long id) {
        return new ResponseEntity<>(productService.deleteProduct(id), OK);
    }
}
