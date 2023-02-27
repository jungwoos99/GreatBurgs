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

    @GetMapping
    public ResponseEntity<User> getUserInfo(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<User> updateUserPoints(@PathVariable("id") Integer id, @RequestBody User user) {
        Optional<User> userInfo = userRepository.findById(id);

        if(userInfo.isPresent()) {
            User updatedUser = userInfo.get();
            updatedUser.setPoints(updatedUser.getPoints() + user.getPoints());
            return new ResponseEntity<>(userRepository.save(updatedUser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*TODO

     */
}
