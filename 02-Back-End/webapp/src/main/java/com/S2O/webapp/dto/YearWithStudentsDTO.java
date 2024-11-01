package com.S2O.webapp.dto;

import java.util.List;

public class YearWithStudentsDTO {
    private Long yearId;
    private Long yearValue;
    private List<StudentDTO> students; // Only students are required here

    public YearWithStudentsDTO(Long yearId, Long yearValue, List<StudentDTO> students) {
        this.yearId = yearId;
        this.yearValue = yearValue;
        this.students = students;
    }

    // Getters and setters
    public Long getYearId() { return yearId; }
    public Long getYearValue() { return yearValue; }
    public List<StudentDTO> getStudents() { return students; }
}
