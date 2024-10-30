package com.S2O.webapp.Entity;

import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Entity

public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "term_id")
    private int termId;

    @Column(name = "term_name")
    private String termName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "year_year_id")
    private Year year;

    @OneToMany(mappedBy = "term", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Subject> subjects;
}
