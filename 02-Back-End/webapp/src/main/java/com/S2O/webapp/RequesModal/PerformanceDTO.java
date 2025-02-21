package com.S2O.webapp.RequesModal;

import lombok.Data;

@Data
public class PerformanceDTO {
    private Long studentId;
    private String studentName;
    private Long subjectId;
    private String stream;
    private String subjectName;
    private Long examId;
    private String examName;
    private double marks;
    private double maxMarks;
    private double percentage;
    private String year; // Top-level property for the student's year
}