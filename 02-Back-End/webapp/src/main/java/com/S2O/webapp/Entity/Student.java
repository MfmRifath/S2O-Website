package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "stream")
    private String stream;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "year_year_id")
    @JsonBackReference
    private Year year;

    public Student(Long studentId, String studentName, String stream, Year year) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.stream = stream;
        this.year = year;
    }

    public Student() {}
}
