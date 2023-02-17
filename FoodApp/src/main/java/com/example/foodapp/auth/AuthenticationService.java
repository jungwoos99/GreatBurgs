package com.example.foodapp.auth;

import com.example.foodapp.config.JwtService;
import com.example.foodapp.model.Role;
import com.example.foodapp.model.User;
import com.example.foodapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationResponse) {
        Supplier<UsernameNotFoundException> usernameNotFoundExceptionSupplier = () ->
                new UsernameNotFoundException("User was not found in database, please register an account.");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationResponse.getEmail(),
                        authenticationResponse.getPassword()
                )
        );
        var user = repository.findByEmail(authenticationResponse.getEmail())
                .orElseThrow(usernameNotFoundExceptionSupplier);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
