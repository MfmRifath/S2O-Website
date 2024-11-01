package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "administration")
public class Administration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Make sure this column exists in the database
    private Long id;
    @Column(name = "designation")
    private String designation;

    @Column(name = "admin_name")
    private String adminName;

    @Column(name = "admin_qualification")
    private String adminQualification;

    @Column(name = "insta")
    private String insta;

    @Column(name = "linkedin")
    private String linkedIn;

    @Column(name = "email")
    private String email;

    @Column(name = "year")
    private int year;

    @OneToOne(mappedBy = "administration", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Image adminImages;
}
