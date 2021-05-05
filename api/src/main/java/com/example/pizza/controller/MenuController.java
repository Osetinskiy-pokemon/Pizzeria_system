package com.example.pizza.controller;

import com.example.pizza.payload.ApiResponse;
import com.example.pizza.payload.MenuRequest;
import com.example.pizza.payload.MenuResponse;
import com.example.pizza.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

/**
 * Контроллер раздела Меню
 */
@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    MenuService menuService;

    @GetMapping("/all")
    public List<MenuResponse> getMenu() {
        return menuService.getAllMenu();
    }

    /**
     * Обновление информации у меню
     * @param id
     * @param menuRequest
     * @return
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateMenu(@PathVariable long id, @RequestBody MenuRequest menuRequest) {
        return new ResponseEntity<>(menuService.updateMenu(id, menuRequest), OK);
    }

    /**
     * Добавление в меню нового товара
     * @param menuRequest
     * @return
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewItemMenu(@RequestBody MenuRequest menuRequest) {
        try {
            menuService.createMenu(menuRequest);
            return new ResponseEntity<>(new ApiResponse(true, "New item menu created"), CREATED);
        } catch (DataAccessException exception) {
            return new ResponseEntity<>(new ApiResponse(false, "New item menu did not create"), INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Удаление товара из меню (soft-delete)
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteItemMenu(@PathVariable long id) {
        return new ResponseEntity<>(menuService.updateItemMenuStatus(id), OK);
    }

    /**
     * Восстановление товара в меню
     * @param id
     * @return
     */
    @PutMapping("/{id}/restore")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> restoreItemMenu(@PathVariable long id) {
        return new ResponseEntity<>(menuService.restoreItemMenuStatus(id), OK);
    }
}
