package com.example.foodapp.controller;

import com.example.foodapp.model.Food;
import com.example.foodapp.repository.FoodRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/food")
public class FoodController {

    private FoodRepository foodRepository;

    public FoodController(FoodRepository foodRepository) {this.foodRepository = foodRepository;}

    @GetMapping
    public ResponseEntity<List<Food>> getAllFood() {
        try {
            List<Food> allFood = new ArrayList<>();

            foodRepository.findAll().forEach(allFood::add);

            if(allFood.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(allFood, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable("id") Long id) {
        Optional<Food> foodData = foodRepository.findById(id);

        if(foodData.isPresent()) {
            return new ResponseEntity<>(foodData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        try {
            Food newFood = foodRepository
                    .save(new Food(food.getName(), food.getDescription(),
                            food.getIngredients(), food.getPrice(), food.getPointValue(),
                            food.getImgUrl()));
            return new ResponseEntity<>(newFood, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable("id") long id,@RequestBody Food food) {
        Optional<Food> foodData = foodRepository.findById(id);

        if(foodData.isPresent()) {
            Food updatedFoodData = foodData.get();

            updatedFoodData.setName(food.getName());
            updatedFoodData.setDescription(food.getDescription());
            updatedFoodData.setIngredients(food.getIngredients());
            updatedFoodData.setPrice(food.getPrice());
            updatedFoodData.setPointValue(food.getPointValue());
            updatedFoodData.setImgUrl(food.getImgUrl());

            return new ResponseEntity<>(foodRepository.save(updatedFoodData), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteFoodById(@PathVariable("id") long id) {
        try {
            foodRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAllFood() {
        try {
            foodRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
