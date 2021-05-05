package com.example.pizza.loader;

import com.example.pizza.model.Employee;
import com.example.pizza.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Лоадер для генерации сотрудников
 */
//@Component
public class EmployeeLoader implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeLoader(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.employeeRepository.save(new Employee("Иван", "Иванов", "+7926-573-0433", LocalDateTime.now()));
        this.employeeRepository.save(new Employee("Алексей","Петров" , "+7926-573-0433", LocalDateTime.now()));
        this.employeeRepository.save(new Employee( "Петр", "Шевцов","+7926-573-0433", LocalDateTime.now()));
    }
}
