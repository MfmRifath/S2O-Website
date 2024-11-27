package com.S2O.webapp.Entity;



import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@Table(name = "marks")
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "exam_type", nullable = false)
    private String examType;

    @Column(name = "marks", nullable = false)
    private int marks;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "subject", nullable = false)
    private String subject;

    // Getters and setters
}