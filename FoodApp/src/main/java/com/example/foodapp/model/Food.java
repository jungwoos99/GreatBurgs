package com.example.foodapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @Column(name = "description", length = 500, nullable = false)
    private String description;
    @Column(name = "ingredients", length = 500, nullable = false)
    private String ingredients;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "point_value", nullable = false)
    private Integer pointValue;
    @Column(name = "img_url", nullable = false, length = 500)
    private String imgUrl;

    public Food() {}

    public Food(String name, String description, String ingredients, BigDecimal price, Integer pointValue, String imgUrl) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.price = price;
        this.pointValue = pointValue;
        this.imgUrl = imgUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getPointValue() {
        return pointValue;
    }

    public void setPointValue(Integer pointValue) {
        this.pointValue = pointValue;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    @Override
    public String toString() {
        return "Food{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", ingredients='" + ingredients + '\'' +
                ", price=" + price +
                ", pointValue=" + pointValue +
                ", imgUrl='" + imgUrl + '\'' +
                '}';
    }
}
