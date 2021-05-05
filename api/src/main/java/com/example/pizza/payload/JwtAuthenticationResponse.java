package com.example.pizza.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Формат тела ответа авторизации
 */
@Setter
@Getter
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private List<String> roles;

    public JwtAuthenticationResponse(String accessToken, List<String> roles) {
        this.accessToken = accessToken;
        this.roles = roles;
    }

}
