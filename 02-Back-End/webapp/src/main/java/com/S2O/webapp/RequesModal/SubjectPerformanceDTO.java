package com.S2O.webapp.RequesModal;

import lombok.Data;

@Data
public class SubjectPerformanceDTO {
    private Long subjectId;
    private String subjectName;
    private double totalMarksObtained;
    private double totalMaxMarks;
    private double averagePercentage;
}