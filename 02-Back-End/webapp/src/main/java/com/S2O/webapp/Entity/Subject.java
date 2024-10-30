package com.S2O.webapp.Entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity

public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private int subjectId;

    @Column(name = "subject_name")
    private String subjectName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "term_term_id")
    private Term term;

    @OneToOne(mappedBy = "subject", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private StudentMark studentMark;
}
