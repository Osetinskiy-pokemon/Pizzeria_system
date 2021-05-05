package com.example.pizza.service;

import com.example.pizza.model.Menu;
import com.example.pizza.model.Product;
import com.example.pizza.payload.ApiResponse;
import com.example.pizza.payload.MenuRequest;
import com.example.pizza.payload.MenuResponse;
import com.example.pizza.payload.ProductResponse;
import com.example.pizza.repository.MenuRepository;
import com.example.pizza.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Сервис взаимодействия с меню
 */
@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    ProductRepository productRepository;

    public Optional<Menu> getMenuById(Long Id) {
        return menuRepository.findById(Id);
    }

    public ApiResponse updateMenu(Long Id, MenuRequest menuRequest) {
        Optional<Menu> menuFromDb = menuRepository.findById(Id);

        if (menuFromDb.isPresent()) {
            Menu updatedMenu = menuFromDb.get();
            updatedMenu.setName(menuRequest.getName());
            updatedMenu.setPrice(menuRequest.getPrice());
            updatedMenu.setWeight(menuRequest.getWeight());
            updatedMenu.setStatus(menuRequest.isStatus());

            menuRepository.save(updatedMenu);

            return new ApiResponse(true, "Menu updated");
        } else {
            return new ApiResponse(false, "Menu not found");
        }
    }

    public List<MenuResponse> getAllMenu() {
        List<MenuResponse> menuResponseList = new ArrayList<>();

        menuRepository.findAll().forEach(menu -> {
            List<ProductResponse> productResponseList = new ArrayList<>();

            menu.getProductSet().forEach(product -> productResponseList.add(new ProductResponse(product.getId(), product.getName())));
            menuResponseList.add(new MenuResponse(menu.getId(), menu.getName(),
                    menu.getPrice(), menu.getWeight(), menu.getImage(),
                    menu.isStatus(), productResponseList));
        });

        return menuResponseList;
    }

    public void createMenu(MenuRequest menuRequest) {
        Menu menu = new Menu(menuRequest.getName(), menuRequest.getPrice(), menuRequest.getWeight(), menuRequest.isStatus(),
                "https://img.freepik.com/free-vector/cute-pizza-cartoon-vector-icon-illustration-fast-food-icon-concept-flat-cartoon-style_138676-2588.jpg?size=338&ext=jpg");
        if (menuRequest.getProductList() != null) {
            List<Product> listProduct = new ArrayList<>();
            menuRequest.getProductList().forEach(product -> listProduct.add(productRepository.getOne(product)));
            menu.addProduct(listProduct);
        }
        menuRepository.save(menu);
    }

    public ApiResponse updateItemMenuStatus(Long Id) {
        Optional<Menu> menuFromDb = menuRepository.findById(Id);

        if (menuFromDb.isPresent()) {
            Menu updatedMenu = menuFromDb.get();
            updatedMenu.setStatus(true);
            menuRepository.save(updatedMenu);
            return new ApiResponse(true, "Menu item deleted");
        } else {
            return new ApiResponse(false, "Menu item not found");
        }
    }

    public ApiResponse restoreItemMenuStatus(Long Id) {
        Optional<Menu> menuFromDb = menuRepository.findById(Id);

        if (menuFromDb.isPresent()) {
            Menu updatedMenu = menuFromDb.get();
            updatedMenu.setStatus(false);
            menuRepository.save(updatedMenu);
            return new ApiResponse(true, "Menu item restores");
        } else {
            return new ApiResponse(false, "Menu item not found");
        }
    }
}
