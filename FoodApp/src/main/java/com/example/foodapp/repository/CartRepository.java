package com.example.foodapp.repository;

import com.example.foodapp.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByCartOwnerId(long cartOwnerId);

}
