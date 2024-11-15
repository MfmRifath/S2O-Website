package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "term_id")
    private Long termId;

    @Column(name = "term_name")
    private String termName;

    // Corrected reference to the custom Year entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "year_id")
    @JsonBackReference
    private Year year;

    @OneToMany(mappedBy = "term", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Subject> subjects;

    @Override
    public String toString() {
        return "Term{" +
                "termId=" + termId +
                ", termName='" + termName + '\'' +
                // Avoid printing year or subjects to prevent circular references
                '}';
    }

}
