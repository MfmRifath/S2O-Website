package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Long subjectId;

    @Column(name = "subject_name")
    private String subjectName;

    @ManyToOne
    @JoinColumn(name = "term_term_id")
    @JsonBackReference
    private Term term;

    @OneToOne(mappedBy = "subject", cascade = CascadeType.ALL)
    private StudentMark studentMark;




}
