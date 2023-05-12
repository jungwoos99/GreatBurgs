package com.example.foodapp.model;

import jakarta.persistence.*;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "_cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "cart_total")
    private BigDecimal cartTotal;

    @Column(name = "cart_owner_id", unique = true)
    private long cartOwnerId;

    @ElementCollection
    @Column(name = "cart_items")
    private List<Long> cartItems = new ArrayList<>();

    public Cart() {};

    public Cart(Long cartOwnerId) {
        this.cartOwnerId = cartOwnerId;
        this.cartItems = new ArrayList<>();
        this.cartTotal = BigDecimal.valueOf(0);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public BigDecimal getCartTotal() {
        return cartTotal;
    }

    public void setCartTotal(BigDecimal cartTotal) {
        this.cartTotal = cartTotal;
    }

    public Long getCartOwnerId() {
        return cartOwnerId;
    }

    public void setCartOwnerId(Long cartOwnerId) {
        this.cartOwnerId = cartOwnerId;
    }

    public List<Long> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<Long> cartItems) {
        this.cartItems = cartItems;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", cartTotal=" + cartTotal +
                ", cartOwnerId=" + cartOwnerId +
                ", cartItems=" + cartItems.toString() +
                '}';
    }
}
