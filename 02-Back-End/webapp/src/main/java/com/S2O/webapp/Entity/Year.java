package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Year {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "year_id")
    private Long yearId;

    @Column(name = "year_value")
    private Long yearValue;

    @OneToMany(mappedBy = "year", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Term> terms;

    @OneToMany(mappedBy = "year", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Student> students;

    public Year(Long yearId, Long yearValue) {
        this.yearId = yearId;
        this.yearValue = yearValue;
    }

    public Year(Long yearId, List<Term> terms, List<Student> students, Long yearValue) {
        this.yearId = yearId;
        this.terms = terms;
        this.students = students;
        this.yearValue = yearValue;
    }

    public Year() {}

    @Override
    public String toString() {
        return "Year{" +
                "yearId=" + yearId +
                ", yearValue=" + yearValue +
                '}';
    }
}
