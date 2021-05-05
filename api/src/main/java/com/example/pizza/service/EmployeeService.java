package com.example.pizza.service;

import com.example.pizza.model.Employee;
import com.example.pizza.payload.EmployeeResponse;
import com.example.pizza.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Сервис взаимодействия с сотрудниками
 */
@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void createEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    public List<EmployeeResponse> getAllEmployees() {
        List<EmployeeResponse> employeeResponseList = new ArrayList<>();

        employeeRepository.findAll().forEach(employee -> employeeResponseList.add(new EmployeeResponse(employee.getId(),
                employee.getFirstName(),employee.getLastName(),
                employee.getTelephone(),employee.getHireDate())));

        return employeeResponseList;
    }
}
