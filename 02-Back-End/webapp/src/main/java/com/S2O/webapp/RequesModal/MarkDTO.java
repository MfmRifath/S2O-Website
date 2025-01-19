package com.S2O.webapp.RequesModal;

import com.S2O.webapp.RequesModal.ExamDTO;
import com.S2O.webapp.RequesModal.StudentDTO;
import com.S2O.webapp.RequesModal.SubjectDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarkDTO {
    private Long id;
    private StudentDTO studentDTO;
    private SubjectDTO subjectDTO;
    private ExamDTO examDTO;
    private double marks;
    private double maxMarks;
}