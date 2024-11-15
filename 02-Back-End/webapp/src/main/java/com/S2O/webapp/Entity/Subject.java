package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    private StudentMark studentMark;

    // Helper method for bidirectional relationship
    public void setStudentMark(StudentMark studentMark) {
        this.studentMark = studentMark;
        if (studentMark != null) {
            studentMark.setSubject(this);
        }
    }

}
