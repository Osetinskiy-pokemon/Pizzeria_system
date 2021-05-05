package com.example.pizza.loader;

import com.example.pizza.model.Menu;
import com.example.pizza.model.Product;
import com.example.pizza.repository.MenuRepository;
import com.example.pizza.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Лоадер для генерации меню
 */
//@Component
public class MenuLoader implements CommandLineRunner {
    private final MenuRepository menuRepository;
    private final ProductRepository productRepository;

    @Autowired
    private MenuLoader(MenuRepository menuRepository, ProductRepository productRepository) {
        this.menuRepository = menuRepository;
        this.productRepository = productRepository;
    }

    public void run(String... args) {
        Menu menuFirst = new Menu("Маргарита", 345, 620, false,
                "https://dodopizza-a.akamaihd.net/static/Img/Products/e8a8ded1f8154d11ab5065dc5208b187_584x584.jpeg"),
                menuSecond = new Menu("Пепперони", 395, 570, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/4e630ad6-e12e-4d52-ac4c-a7edb799c0fa.jpg"),
                menuThird = new Menu("Ветчина и грибы", 345, 600, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/26fa2948b6c74113afb9d09a3262fc26_584x584.jpeg"),
                menuFourth = new Menu("Аррива!", 395, 590, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/72c7882f35ad4db1805bb43f09717d8d_366x366.jpeg"),
                menu5 = new Menu("Чиззи чеддер", 330, 480, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/2d1fc30e0e324de798e70e57f039fe41_366x366.jpeg"),
                menu6 = new Menu("Сырный цыпленок", 520, 500, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/fc4d663d-fb00-48ea-8391-7a4648553f25.jpg"),
                menu7 = new Menu("Цезарь", 350, 410, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/4518d232ca98422f876872b0fb2669a3_366x366.jpeg"),
                menu8 = new Menu("Четыре сезона", 600, 550, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/6d4e1c2c-1c81-40c6-95d9-0d19afcebcb5.jpg"),
                menu9 = new Menu("Карбонара", 490, 400, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/c2a25ef27bf24b6f84e034e684f32fa7_366x366.jpeg"),
                menu10 = new Menu("Пеперони Фреш", 279, 570, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/5dffe4c7d3bc49668f50c1d08d920992_584x584.jpeg"),
                menu11 = new Menu("Сырная", 279, 490, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/38a9d286399345c7a560fb649e09e8b4_584x584.jpeg"),
                menu12 = new Menu("Ветчина и сыр", 319, 510, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/362468e7-e8d3-4fda-ab66-91f4dbd56122.jpg"),
                menu13 = new Menu("Кисло-сладкий цыпленок", 319, 520, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/e9c5aec6-2675-4b43-90c9-8013f8bfda99.jpg"),
                menu14 = new Menu("Чизбургер-пицца", 449, 610, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/8a813e3b734e457c848a60fc70a100d5_584x584.jpeg"),
                menu15 = new Menu("Мясная", 449, 610, false,
                        "https://dodopizza-a.akamaihd.net/static/Img/Products/88cfeba06c7d4863852c483d0817f763_584x584.jpeg");

        Product productOne = new Product("Пепперони"),
                productTwo = new Product("Ветчина"),
                productThird = new Product("Томат"),
                productFour = new Product("Шампишьон"),
                productFive = new Product("Красный лук"),
                productSex = new Product("Острый цыпленок"),
                productSeven = new Product("Сыр моцарелла"),
                productEighth = new Product("Острая чоризо"),
                product9 = new Product("Соус бургер"),
                product10 = new Product("Сладкий перец"),
                product11 = new Product("Томатный соус"),
                product12 = new Product("Итальянские травы"),
                product13 = new Product("Соус альфредо"),
                product15 = new Product("Чеснок"),
                product16 = new Product("Сырный соус"),
                product17 = new Product("Мясной соус болоньезе"),
                product18 = new Product("Соленые огурчики"),
                product21 = new Product("Сыр чеддер"),
                product23 = new Product("Цыпленок"),
                product26 = new Product("Кубики брынзы"),
                product27 = new Product("Бекон"),
                product28 = new Product("Сыр пармезан"),
                product29 = new Product("Томаты черри"),
                product31 = new Product("Листя салата айсберг"),
                product32 = new Product("Соус цезарь");

        List<Product> listProductFirst = Arrays.asList(productThird, productSeven, productFive);
        List<Product> listProductSecond = Arrays.asList(productOne, productTwo, productThird, productFour);
        List<Product> listProductThird = Arrays.asList(productTwo, productFour, productSeven, product11);
        List<Product> listProductFourth = Arrays.asList(productSex, product9, productEighth, product10);
        List<Product> listProduct5 = Arrays.asList(productTwo, product21, product10, productSeven, product11, product15, product12);
        List<Product> listProduct6 = Arrays.asList(product23, productSeven, product16, productThird);
        List<Product> listProduct7 = Arrays.asList(product31, product23, product29, product21, product32);
        List<Product> listProduct8 = Arrays.asList(productSeven, productTwo, productOne, product26, productThird, productFour, product11, product12);
        List<Product> listProduct9 = Arrays.asList(product27, product28, product28, product29, productFive, product15, product13);
        List<Product> listProduct10 = Arrays.asList(productOne, productSeven, productThird, product11);
        List<Product> listProduct11 = Arrays.asList(productSeven, product21, product28, product13);
        List<Product> listProduct12 = Arrays.asList(productTwo, productSeven, product13);
        List<Product> listProduct13 = Arrays.asList(product23, product23, productSeven, product11);
        List<Product> listProduct14 = Arrays.asList(product17, product9, product18, productThird, productSeven, productFive);
        List<Product> listProduct15 = Arrays.asList(product23, productTwo, productOne, productEighth, productSeven, product11);


        menuRepository.save(menuFirst);
        productRepository.saveAll(listProductFirst);
        menuFirst.addProduct(listProductFirst);
        menuRepository.save(menuFirst);

        menuRepository.save(menuSecond);
        productRepository.saveAll(listProductSecond);
        menuSecond.addProduct(listProductSecond);
        menuRepository.save(menuSecond);

        menuRepository.save(menuThird);
        productRepository.saveAll(listProductThird);
        menuThird.addProduct(listProductThird);
        menuRepository.save(menuThird);

        menuRepository.save(menuFourth);
        productRepository.saveAll(listProductFourth);
        menuFourth.addProduct(listProductFourth);
        menuRepository.save(menuFourth);

        menuRepository.save(menu5);
        productRepository.saveAll(listProduct5);
        menu5.addProduct(listProduct5);
        menuRepository.save(menu5);

        menuRepository.save(menu6);
        productRepository.saveAll(listProduct6);
        menu6.addProduct(listProduct6);
        menuRepository.save(menu6);

        menuRepository.save(menu7);
        productRepository.saveAll(listProduct7);
        menu7.addProduct(listProduct7);
        menuRepository.save(menu7);

        menuRepository.save(menu8);
        productRepository.saveAll(listProduct8);
        menu8.addProduct(listProduct8);
        menuRepository.save(menu8);

        menuRepository.save(menu9);
        productRepository.saveAll(listProduct9);
        menu9.addProduct(listProduct9);
        menuRepository.save(menu9);

        menuRepository.save(menu10);
        productRepository.saveAll(listProduct10);
        menu10.addProduct(listProduct10);
        menuRepository.save(menu10);

        menuRepository.save(menu11);
        productRepository.saveAll(listProduct11);
        menu11.addProduct(listProduct11);
        menuRepository.save(menu11);

        menuRepository.save(menu12);
        productRepository.saveAll(listProduct12);
        menu12.addProduct(listProduct12);
        menuRepository.save(menu12);

        menuRepository.save(menu13);
        productRepository.saveAll(listProduct13);
        menu13.addProduct(listProduct13);
        menuRepository.save(menu13);

        menuRepository.save(menu14);
        productRepository.saveAll(listProduct14);
        menu14.addProduct(listProduct14);
        menuRepository.save(menu14);

        menuRepository.save(menu15);
        productRepository.saveAll(listProduct15);
        menu15.addProduct(listProduct15);
        menuRepository.save(menu15);
    }
}
