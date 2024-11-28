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
    @Column(name = "id")
    private Long id;

    @Column(name = "designation", nullable = false)
    private String designation;

    @Column(name = "admin_name", nullable = false)
    private String adminName;

    @Column(name = "admin_qualification", nullable = false)
    private String adminQualification;

    @Column(name = "insta", nullable = false)
    private String insta;

    @Column(name = "linkedIn",nullable = false)
    private String linkedIn;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "year", nullable = false)
    private int year;


    @JsonManagedReference
    @OneToOne(mappedBy = "administration", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Image adminImages;
}
