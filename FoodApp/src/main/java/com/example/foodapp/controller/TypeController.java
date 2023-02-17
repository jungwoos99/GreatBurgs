package com.example.foodapp.controller;

import com.example.foodapp.model.Type;
import com.example.foodapp.repository.TypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/foodType")
public class TypeController {

    TypeRepository typeRepository;

    public TypeController(TypeRepository typeRepository) {this.typeRepository = typeRepository;}

    @GetMapping
    public ResponseEntity<List<Type>> getTypes() {
        try {
            List<Type> allTypes = new ArrayList<>();
            typeRepository.findAll().forEach(allTypes::add);
            if (allTypes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(allTypes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type> getTypeById(@PathVariable("id") Integer id) {
        Optional<Type> typeData = typeRepository.findById(id);
        if(typeData.isPresent()) {
            return new ResponseEntity<>(typeData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Type> createType(@RequestBody Type newType) {
        try {
            Type type = typeRepository.save(new Type(newType.getFoodType()));
            return new ResponseEntity<>(type, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteType(@PathVariable("id") Integer id) {
        try {
            typeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
