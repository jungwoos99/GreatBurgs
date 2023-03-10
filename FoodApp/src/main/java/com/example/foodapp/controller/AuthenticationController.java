package com.example.foodapp.controller;

import com.example.foodapp.auth.AuthenticationRequest;
import com.example.foodapp.auth.AuthenticationResponse;
import com.example.foodapp.auth.AuthenticationService;
import com.example.foodapp.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest registerRequest
    ) {
        ResponseEntity responseEntity;
        try {
            responseEntity = ResponseEntity.ok(service.register(registerRequest));
        } catch (Exception e) {
            responseEntity = ResponseEntity.internalServerError().build();
        }
        return responseEntity;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        ResponseEntity responseEntity;

        try {
            responseEntity = ResponseEntity.ok(service.authenticate(authenticationRequest));
        } catch (BadCredentialsException r) {
            responseEntity = ResponseEntity.badRequest().build();
        }

        return responseEntity;
    }

}
