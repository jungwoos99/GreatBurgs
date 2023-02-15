package com.example.foodapp.controller;

import com.example.foodapp.model.User;
import com.example.foodapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    UserRepository userRepository;

    public UserController(UserRepository userRepository) {this.userRepository = userRepository;}

    @GetMapping
    public ResponseEntity<User> getUserInfo(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
