package com.S2O.webapp.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class StudentDTO {

    private Long studentId;

    @NotNull(message = "Student name cannot be null")
    @Size(min = 1, max = 50, message = "Student name must be between 1 and 50 characters")
    private String studentName;

    @Size(max = 30, message = "Stream cannot exceed 30 characters")
    private String stream;

    private YearDTO year;

    public StudentDTO(Long studentId, String studentName, String stream, YearDTO year) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.stream = stream;
        this.year = year; // No need to create a new instance if it's provided as a YearDTO
    }

    // Getters and setters...
}
