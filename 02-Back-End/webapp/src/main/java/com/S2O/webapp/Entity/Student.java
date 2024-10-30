package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private int studentId;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "stream")
    private String stream;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "year_year_id")
    private Year year;
}
