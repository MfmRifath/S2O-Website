package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private Float averageMarks;
    private Integer examCount;

    @Enumerated(EnumType.STRING)
    private Stream stream; // Correct enum type

    // Getters and Setters
}
