package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;

@Data
@Entity
public class StudentMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private Long markId;

    @Column(name = "mark")
    private int mark;

    @Setter
    @OneToOne
    @JoinColumn(name = "subject_subject_id", unique = true)
    @JsonBackReference
    private Subject subject;

}
