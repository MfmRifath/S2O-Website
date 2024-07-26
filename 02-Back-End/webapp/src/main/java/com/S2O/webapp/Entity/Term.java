package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "term")
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "term_id")
    private int termId;

    @Column(name = "term_name")
    private String termName;
}
