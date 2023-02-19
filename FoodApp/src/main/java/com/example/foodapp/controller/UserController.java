package com.example.foodapp.controller;

import com.example.foodapp.model.User;
import com.example.foodapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    UserRepository userRepository;

    public UserController(UserRepository userRepository) {this.userRepository = userRepository;}

    @PostMapping
    public ResponseEntity<User> getUserInfo(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*TODO
        Configure PutMapping controller method that takes in some body, object and updates a users point attribute
     */
}
