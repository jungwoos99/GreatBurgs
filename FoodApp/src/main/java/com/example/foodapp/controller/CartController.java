package com.example.foodapp.controller;

import com.example.foodapp.model.Cart;
import com.example.foodapp.model.Food;
import com.example.foodapp.repository.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cart")
public class CartController {

    private CartRepository cartRepository;

    private CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart>findCartByUserId (@PathVariable("id") Long id) {
        Optional<Cart> cartInfo = cartRepository.findByCartOwnerId(id);

        if(cartInfo.isPresent()) {
            return new ResponseEntity<>(cartInfo.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Cart> saveCart(@RequestBody Cart cartInfo) {
        try {
            Cart newCart = cartRepository.save(
                    new Cart(Long.valueOf(cartInfo.getCartOwnerId()))
            );
            return new ResponseEntity<>(newCart, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}/add")
    public ResponseEntity<Cart> addCartItem(@PathVariable("id") Long id, @RequestBody Food food) {
        Optional<Cart> cartInfo = cartRepository.findByCartOwnerId(id);

        if(cartInfo.isPresent()) {
            Cart updatedCartInfo = cartInfo.get();

            if(!updatedCartInfo.getCartItems().contains(food.getId())) {
                List<Long> newCartItems = updatedCartInfo.getCartItems();
                newCartItems.add(newCartItems.size(), food.getId());

                updatedCartInfo.setCartItems(newCartItems);
                updatedCartInfo.setCartTotal(updatedCartInfo.getCartTotal().add((food.getPrice())));
                updatedCartInfo.setCartOwnerId(cartInfo.get().getCartOwnerId());

                return new ResponseEntity<>(cartRepository.save(updatedCartInfo), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/remove")
    public ResponseEntity<Cart> removeCartItem(@PathVariable("id") Long id, @RequestBody Food food) {
        Optional<Cart> cartInfo = cartRepository.findByCartOwnerId(id);

        if(cartInfo.isPresent()) {
            Cart updatedCartInfo = cartInfo.get();

            if(updatedCartInfo.getCartItems().contains(food.getId())) {
                List<Long> newCartItems = updatedCartInfo.getCartItems();
                newCartItems.remove(food.getId());

                updatedCartInfo.setCartItems(newCartItems);
                updatedCartInfo.setCartTotal(updatedCartInfo.getCartTotal().subtract(food.getPrice()));
                updatedCartInfo.setCartOwnerId(cartInfo.get().getCartOwnerId());

                return new ResponseEntity<>(cartRepository.save(updatedCartInfo), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCartByUserId(@PathVariable("id") Long id) {
        Optional<Cart> cartInfo = cartRepository.findByCartOwnerId(id);

        if(cartInfo.isPresent()) {
            cartRepository.deleteById(cartInfo.get().getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
