package com.example.pizza.service;

import com.example.pizza.model.Product;
import com.example.pizza.payload.ApiResponse;
import com.example.pizza.payload.ProductResponse;
import com.example.pizza.repository.MenuRepository;
import com.example.pizza.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


/**
 * Сервис взаимодействия с продуктами
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MenuRepository menuRepository;

    public void createProduct(Product product) {
        productRepository.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public ApiResponse updateProduct(String newName, Long id) {
        Optional<Product> productFromDb = productRepository.findById(id);

        if (productFromDb.isPresent()) {
            Product newProduct = productFromDb.get();
            newProduct.setName(newName);
            productRepository.save(newProduct);
            return new ApiResponse(true, "Product updated");
        } else {
            return new ApiResponse(false, "Product not found");
        }
    }

    public ApiResponse deleteProduct(long id) {
        try {
            menuRepository.findAll().forEach(menu -> {
                menu.deleteProduct(productRepository.getOne(id));
            });
            productRepository.deleteById(id);
            return new ApiResponse(true, "Product deleted");
        } catch (Exception e) {
            return new ApiResponse(false, e.getMessage());
        }
    }

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();

        List<ProductResponse> productResponseList = new ArrayList<>();
        products.forEach(product -> productResponseList.add(new ProductResponse(product.getId(), product.getName())));

        return productResponseList;
    }

}
