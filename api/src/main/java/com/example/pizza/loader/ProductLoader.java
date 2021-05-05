package com.example.pizza.loader;

import com.example.pizza.model.Product;
import com.example.pizza.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Лоадер для генерации продуктов
 */
//@Component
public class ProductLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Autowired
    public ProductLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.productRepository.save(new Product("Пепперони"));
        this.productRepository.save(new Product("Ветчина"));
        this.productRepository.save(new Product("Моцарелла"));
        this.productRepository.save(new Product("Томатный соус"));
        this.productRepository.save(new Product("Томат"));
        this.productRepository.save(new Product("Итальянские травы"));
        this.productRepository.save(new Product("Шампишьон"));
        this.productRepository.save(new Product("Соус альфредо"));
        this.productRepository.save(new Product("Цыпленок"));
        this.productRepository.save(new Product("Острая чоризо"));
        this.productRepository.save(new Product("Соус бургер"));
        this.productRepository.save(new Product("Сладкий перец"));
        this.productRepository.save(new Product("Красный лук"));
        this.productRepository.save(new Product("Соус ранч"));
        this.productRepository.save(new Product("Чеснок"));
        this.productRepository.save(new Product("Сырный соус"));
        this.productRepository.save(new Product("Мясной соус болоньезе"));
        this.productRepository.save(new Product("Соленые огурчики"));
        this.productRepository.save(new Product("Кисло-сладкий соус"));
        this.productRepository.save(new Product("Сыр блю чиз"));
        this.productRepository.save(new Product("Сыр чеддер"));
        this.productRepository.save(new Product("Ананасы"));
        this.productRepository.save(new Product("Острый цыпленок"));
        this.productRepository.save(new Product("Острый перец халапеньо"));
        this.productRepository.save(new Product("Соус сальса"));
        this.productRepository.save(new Product("Кубики брынзы"));
        this.productRepository.save(new Product("Бекон"));
        this.productRepository.save(new Product("Сыр пармезан"));
        this.productRepository.save(new Product("Томаты черри"));
        this.productRepository.save(new Product("Соус барбекю"));
    }
}
