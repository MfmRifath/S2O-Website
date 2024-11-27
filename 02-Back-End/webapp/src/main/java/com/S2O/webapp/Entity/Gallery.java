package com.S2O.webapp.Entity;

import com.S2O.webapp.Entity.Image;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "gallery") // Ensure the table name matches your database schema
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String event;

    private String description;

    @Column(nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Image> images;

    // Getters and setters
}