package com.example.foodapp.auth;

import com.example.foodapp.config.JwtService;
import com.example.foodapp.model.Role;
import com.example.foodapp.model.User;
import com.example.foodapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.TemporalAccessor;

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
                .points(0)
                .role(Role.USER)
                .dateJoined((java.time.LocalDate.now()))
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationResponse) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    authenticationResponse.getEmail(),
                    authenticationResponse.getPassword()
            )
        );
        var user = repository.findByEmail(authenticationResponse.getEmail()).orElseThrow(()-> new BadCredentialsException("Please enter the correct login information."));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
