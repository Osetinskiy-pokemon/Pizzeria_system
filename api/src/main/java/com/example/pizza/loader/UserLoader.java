package com.example.pizza.loader;

import com.example.pizza.exception.AppException;
import com.example.pizza.model.Client;
import com.example.pizza.model.Role;
import com.example.pizza.model.RoleName;
import com.example.pizza.repository.RoleRepository;
import com.example.pizza.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

/**
 * Лоадер для генерации пользователей
 */
//@Component
public class UserLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserLoader(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        Client client = new Client("Администартор", "Адм", "admin", "+7977-845-4512",
                "adm@adm.com", "Мск", this.passwordEncoder.encode("1234"));

        Role userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new AppException("User Role not set."));

        client.setRoles(Collections.singleton(userRole));

        this.userRepository.save(client);
    }
}
