package com.S2O.webapp.RequesModal;

import com.S2O.webapp.Entity.Exam;
import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.Entity.Subject;
import lombok.Data;

@Data
public class MarkDTO {
    private Long id;
    private double marks;
    private double maxMarks;

    // IDs for related entities
    private StudentDTO studentDTO;
    private SubjectDTO subjectDTO;
    private ExamDTO examDTO;

}