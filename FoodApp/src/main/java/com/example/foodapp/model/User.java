package com.example.foodapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

@Entity
@Table(
        name = "users"
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;


    @Column(name = "email", nullable = false, unique = true)
    @Email
    private String email;

    @Column(name = "points", nullable = false)
    private Integer points;

    public User() {}

    public User(String username, String password, String email, Integer points) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.points = points;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", points=" + points +
                '}';
    }
}
