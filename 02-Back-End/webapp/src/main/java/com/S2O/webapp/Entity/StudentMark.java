package com.S2O.webapp.Entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class StudentMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private int markId;

    @Column(name = "mark")
    private int mark;

    @OneToOne
    @JoinColumn(name = "subject_subject_id")
    private Subject subject;
}
