package com.S2O.webapp.Entity;

import javax.persistence.*;

import com.S2O.webapp.Entity.Image;
import lombok.Data;

@Data
@Entity
@Table(name = "our_teacher")
public class OurTeacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String teacherName;

    @Column(nullable = true)
    private String teacherQualification;

    @Column(nullable = true)
    private String teacherSubject;

    @OneToOne(mappedBy = "ourTeacher", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Image image;
}