package com.example.foodapp.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "types")
public class Type {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "type_name", nullable = false, unique = true)
    private String typeName;

    public Type() {}

    public Type(String typeName) {
        this.typeName = typeName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    @Override
    public String toString() {
        return "Type{" +
                "id=" + id +
                ", typeName='" + typeName + '\'' +
                '}';
    }
}
