package com.example.foodapp.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "_cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "foodIds", length = 500, nullable = false)
    private List<Integer> foodIds;
}
