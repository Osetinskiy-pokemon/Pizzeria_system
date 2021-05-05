package com.example.pizza.controller;

import com.example.pizza.model.Employee;
import com.example.pizza.payload.*;
import com.example.pizza.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

/**
 * Контроллер сотрудников
 */
@RestController
@RequestMapping("/api/employee")
@PreAuthorize("hasRole('ADMIN')")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    /**
     * Запрос на создания сотрудника
     * @param employeeRequest
     * @return
     */
    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeRequest employeeRequest) {
        try {
            employeeService.createEmployee(new Employee(employeeRequest.getFirstName(), employeeRequest.getLastName(), employeeRequest.getTelephone(), employeeRequest.getHireDate()));
            return new ResponseEntity<>(new ApiResponse(true, "Employee created"), CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Employee did not create"), INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Запрос на получение всех сотрудников
     * @return
     */
    @GetMapping("/all")
    public List<EmployeeResponse> getEmployees() {
        return employeeService.getAllEmployees();
    }
}
