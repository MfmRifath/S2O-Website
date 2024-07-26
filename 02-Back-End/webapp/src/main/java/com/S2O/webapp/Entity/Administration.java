package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "administration")
public class Administration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "designation")
    private String designation;

    @Column(name = "admin_name")
    private String adminName;

    @Column(name = "admin_qualification")
    private String adminQualification;

    @Column(name = "insta")
    private String insta;

    @Column(name = "linked_in")
    private String linkedIn;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "year_id")
    private Year year;


    @Column(name = "admin_img",length = 100000)
    private String adminImg;
}
