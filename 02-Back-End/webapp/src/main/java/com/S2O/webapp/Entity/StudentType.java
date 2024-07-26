package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "student_type")
public class StudentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_type_id")
    private int studentTypeId;

    @Column(name = "student_type_name")
    private String typeName;
}
