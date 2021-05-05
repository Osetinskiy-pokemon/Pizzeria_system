package com.example.pizza.controller;

import com.example.pizza.exception.AppException;
import com.example.pizza.model.Client;
import com.example.pizza.model.Role;
import com.example.pizza.model.RoleName;
import com.example.pizza.payload.ApiResponse;
import com.example.pizza.payload.JwtAuthenticationResponse;
import com.example.pizza.payload.LoginRequest;
import com.example.pizza.payload.SignUpRequest;
import com.example.pizza.repository.RoleRepository;
import com.example.pizza.repository.UserRepository;
import com.example.pizza.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

/**
 * Контроллер аутентифицаии
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    /**
     * Авторизация пользователя
     * @param loginRequest
     * @return
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        List<String> roles = new ArrayList<>();

        userRepository
                .findByUsernameOrEmail(loginRequest.getUsernameOrEmail(), loginRequest.getUsernameOrEmail())
                .get()
                .getRoles()
                .forEach(role -> roles.add(role.getName().toString()));

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, roles));
    }

    /**
     * Регистрация пользователя
     * @param signUpRequest
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    BAD_REQUEST);
        }

        Client client = new Client(signUpRequest.getFirstName(), signUpRequest.getLastName() , signUpRequest.getUsername(), signUpRequest.getPhone(),
                signUpRequest.getEmail(), signUpRequest.getAddress(), signUpRequest.getPassword());

        client.setPassword(passwordEncoder.encode(client.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        client.setRoles(Collections.singleton(userRole));

        Client result = userRepository.save(client);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
