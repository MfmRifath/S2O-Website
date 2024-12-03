package com.S2O.webapp.RequesModal;

import lombok.Data;

@Data
public class MarkDTO {
    private Long id;
    private double marks;
    private double maxMarks;

    // IDs for related entities
    private Long studentId;
    private Long subjectId;
    private Long examId;

    // Optional: Names for display purposes
    private String studentName;
    private String subjectName;
    private String examName;
}